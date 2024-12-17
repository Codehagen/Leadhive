"use server";

/**
 * Creates a new contact request (lead) and notifies relevant providers
 *
 * Flow:
 * 1. Validate input data
 * 2. Find matching zone based on postal code
 * 3. Create lead record
 * 4. Find providers in the zone
 * 5. Send email notifications to provider users
 * 6. Create audit log
 *
 * @param data Contact request data from the form
 * @returns Success/failure response with lead data
 */

import { prisma } from "@/lib/db";
import { sendEmail } from "emails";
import LeadNotificationEmail from "emails/lead-notification-email";
import { findZoneByPostalCode } from "../zone/find-zone";
import { createAuditLog } from "../audit/create-audit-log";
import { sendDiscordNotification } from "../discord/send-discord-notification";
import { chargeForLead } from "../stripe/charge-for-lead";

interface CreateContactRequestData {
  name: string;
  phone: string;
  message?: string;
  address?: string;
  postalCode: string;
  categoryIds: string[];
  email?: string;
  country?: string;
}

export async function createContactRequest(data: CreateContactRequestData) {
  try {
    console.log("📥 Received contact request:", data);

    // Find zone for the postal code
    const zoneResult = await findZoneByPostalCode(data.postalCode, {
      country: data.country,
    });
    console.log("🌍 Zone lookup result:", zoneResult);

    let zone = null;
    let providers: any[] = [];

    if (!zoneResult.success || !zoneResult.data) {
      // Customize message based on country
      const errorMessage =
        data.country === "AU"
          ? "This postcode is not currently serviced by our Australian agents"
          : "No service zone found for this postal code";

      console.warn(`⚠️ No zone found for postal code: ${data.postalCode}`);

      // Send Discord notification for missing zone
      await sendDiscordNotification({
        username: "LeadHive Notification",
        avatar_url: "https://your-leadhive-logo-url.com/logo.png",
        embeds: [
          {
            title: "🚨 New Lead - Unknown Zone",
            description: `Received a lead from ${data.country || "unknown"} area without a configured zone`,
            color: 0xffa500,
            fields: [
              {
                name: "Customer",
                value: data.name,
                inline: true,
              },
              {
                name: "Phone",
                value: data.phone,
                inline: true,
              },
              {
                name: "Address",
                value: data.address || "No address provided",
                inline: false,
              },
              {
                name: "Postal Code",
                value: data.postalCode,
                inline: true,
              },
              {
                name: "Country",
                value: data.country || "Unknown",
                inline: true,
              },
            ],
          },
        ],
      });

      return {
        success: false,
        error: errorMessage,
      };
    }

    zone = await prisma.zone.findUnique({
      where: { id: zoneResult.data.id },
      include: { country: true },
    });

    // Create the lead with SENT status since it will be sent to providers immediately
    const lead = await prisma.lead.create({
      data: {
        customerName: data.name,
        customerPhone: data.phone,
        customerEmail: data.email,
        serviceDetails: data.message || "",
        postalCode: data.postalCode,
        address: data.address || "",
        status: "SENT",
        categories: {
          connect: data.categoryIds.map((id) => ({ id })),
        },
        ...(zone && {
          zone: {
            connect: { id: zone.id },
          },
        }),
      },
      include: {
        categories: true,
        zone: {
          include: {
            country: true,
          },
        },
      },
    });
    console.log("✅ Created lead:", lead);

    // Only look for providers if we have a zone
    if (zone) {
      // Find providers in the zone
      providers = await prisma.provider.findMany({
        where: {
          status: "ACTIVE",
          zones: {
            some: {
              id: zone.id,
            },
          },
          ...(data.categoryIds.length > 0
            ? {
                categories: {
                  some: {
                    id: {
                      in: data.categoryIds,
                    },
                  },
                },
              }
            : {}),
        },
        include: {
          users: {
            where: {
              role: "PROVIDER",
              email: {
                not: null,
              },
            },
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          paymentInfo: true,
        },
      });

      if (providers.length === 0) {
        // Send Discord notification for zone without providers
        await sendDiscordNotification({
          username: "LeadHive Notification",
          avatar_url: "https://your-leadhive-logo-url.com/logo.png",
          embeds: [
            {
              title: "🚨 New Lead - No Providers in Zone",
              description: `Received a lead in ${zone.name} (${zone.state}) with no active providers`,
              color: 0xff0000, // Red color for urgent attention
              fields: [
                {
                  name: "Zone",
                  value: zone.name,
                  inline: true,
                },
                {
                  name: "State",
                  value: zone.state || "Unknown",
                  inline: true,
                },
                {
                  name: "Country",
                  value: zone.country.name,
                  inline: true,
                },
                {
                  name: "Postcode",
                  value: data.postalCode,
                  inline: true,
                },
                {
                  name: "Customer",
                  value: data.name,
                  inline: true,
                },
                {
                  name: "Phone",
                  value: data.phone,
                  inline: true,
                },
                {
                  name: "Address",
                  value: data.address || "No address provided",
                  inline: false,
                },
                {
                  name: "Lead ID",
                  value: lead.id,
                  inline: false,
                },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        });

        console.log("⚠️ No providers found in zone:", zone.name);
      }

      // Process each provider
      console.log("🔄 Processing providers...");
      for (const provider of providers) {
        try {
          console.log(
            `📝 Creating lead connection for provider: ${provider.id}`
          );

          // Create lead-provider connection with SENT status and timestamp
          const leadProvider = await prisma.leadProvider.create({
            data: {
              leadId: lead.id,
              providerId: provider.id,
              status: "SENT",
              sentAt: new Date(),
              respondedAt: null, // Will be updated when provider responds
            },
          });
          console.log("✅ Lead connection created:", leadProvider);

          // Charge the provider
          console.log(`💰 Charging provider ${provider.id} for lead...`);
          const chargeResult = await chargeForLead(provider.id, lead.id);
          if (!chargeResult.success) {
            console.error(
              `❌ Failed to charge provider ${provider.id}:`,
              chargeResult.error
            );
            continue;
          }
          console.log(
            `✅ Successfully charged provider ${provider.id}:`,
            chargeResult
          );

          // Send email notification
          if (provider.contactEmail) {
            try {
              const emailResult = await sendEmail({
                email: provider.contactEmail,
                subject: "newLead",
                react: LeadNotificationEmail({
                  recipientName: provider.contactName,
                  leadInfo: {
                    name: lead.customerName,
                    address: lead.address || "",
                    postalCode: lead.postalCode,
                    phoneNumber: lead.customerPhone,
                  },
                  email: provider.contactEmail,
                }),
              });
              console.log(
                `✉️ Email sent to ${provider.contactEmail}:`,
                emailResult
              );
            } catch (emailError) {
              console.error(
                `❌ Failed to send email to ${provider.contactEmail}:`,
                emailError
              );
            }
          } else {
            console.warn(`⚠️ Provider ${provider.id} missing contact email`);
          }
        } catch (providerError) {
          console.error(
            `❌ Error processing provider ${provider.id}:`,
            providerError
          );
          // Continue with other providers
        }
      }
      console.log("✅ Finished processing all providers");

      // Update lead status based on provider distribution
      if (providers.length > 0) {
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            status: "SENT",
          },
        });
      }
    }

    // Create audit log
    await createAuditLog({
      action: "CREATE_LEAD",
      entityId: lead.id,
      metadata: {
        customerName: data.name,
        postalCode: data.postalCode,
        hasZone: !!zone,
        providersNotified: providers.length,
      },
    });
    console.log("📝 Created audit log");

    return {
      success: true,
      data: lead,
    };
  } catch (error) {
    console.error("Error creating contact request:", error);
    return {
      success: false,
      error: "Failed to create contact request",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
