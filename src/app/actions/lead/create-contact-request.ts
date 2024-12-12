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

interface CreateContactRequestData {
  name: string;
  phone: string;
  message?: string;
  address?: string;
  postalCode: string;
  categoryIds: string[];
  email?: string;
}

export async function createContactRequest(data: CreateContactRequestData) {
  try {
    console.log("📥 Received contact request:", data);

    // Find zone for the postal code
    const zoneResult = await findZoneByPostalCode(data.postalCode);
    console.log("🌍 Zone lookup result:", zoneResult);

    let zone = null;
    let providers: any[] = [];

    if (!zoneResult.success || !zoneResult.data) {
      console.warn("⚠️ No zone found for postal code:", data.postalCode);

      // Send Discord notification for missing zone
      const notificationResult = await sendDiscordNotification({
        username: "LeadHive Notification",
        avatar_url: "https://your-leadhive-logo-url.com/logo.png",
        embeds: [
          {
            title: "🚨 New Lead - Unknown Zone",
            description:
              "Received a lead from an area without a configured zone",
            color: 0xffa500, // Orange color for warning
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
                name: "Categories",
                value:
                  data.categoryIds.length > 0
                    ? data.categoryIds.join(", ")
                    : "No categories specified",
                inline: false,
              },
              {
                name: "Message",
                value: data.message || "No message provided",
                inline: false,
              },
            ],
            footer: {
              text: "LeadHive - New Zone Opportunity",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      });

      if (!notificationResult.success) {
        console.error(
          "Failed to send Discord notification:",
          notificationResult.error
        );
      }
    } else {
      zone = await prisma.zone.findUnique({
        where: { id: zoneResult.data.id },
        include: { country: true },
      });
    }

    // Create the lead regardless of zone
    const lead = await prisma.lead.create({
      data: {
        customerName: data.name,
        customerPhone: data.phone,
        customerEmail: data.email,
        serviceDetails: data.message || "",
        postalCode: data.postalCode,
        status: "PENDING",
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
        },
      });
      console.log(
        "👥 Found matching providers (with users):",
        providers.map((p) => ({
          ...p,
          userCount: p.users.length,
        }))
      );

      // If no providers found, send Discord notification
      if (providers.length === 0) {
        console.log(
          "⚠️ No providers found in zone, sending Discord notification"
        );

        const notificationResult = await sendDiscordNotification({
          username: "LeadHive Notification",
          avatar_url: "https://your-leadhive-logo-url.com/logo.png",
          embeds: [
            {
              title: "🚨 New Lead - No Providers Available",
              color: 0xff0000,
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
                  name: "Location",
                  value: `${zone.name} (${data.postalCode})`,
                  inline: true,
                },
                {
                  name: "Categories",
                  value:
                    data.categoryIds.length > 0
                      ? data.categoryIds.join(", ")
                      : "No categories specified",
                  inline: false,
                },
                {
                  name: "Message",
                  value: data.message || "No message provided",
                  inline: false,
                },
              ],
              footer: {
                text: "LeadHive - No Provider Alert",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        });

        if (!notificationResult.success) {
          console.error(
            "Failed to send Discord notification:",
            notificationResult.error
          );
        }
      }

      // Send email notifications to providers
      console.log("📧 Attempting to send emails to providers...");
      const emailPromises = providers.flatMap((provider) =>
        provider.users.map(async (user) => {
          // Use provider's contact email instead of user email
          const recipientEmail = provider.contactEmail;

          if (!recipientEmail) {
            console.warn("⚠️ Provider missing contact email:", provider.id);
            return;
          }

          try {
            const emailResult = await sendEmail({
              email: recipientEmail, // Send to provider's contact email
              subject: "newLead",
              react: LeadNotificationEmail({
                recipientName: provider.contactName, // Use provider's contact name
                leadInfo: {
                  name: lead.customerName,
                  address: `${zone.name}, ${zone.country.name}`,
                  postalCode: lead.postalCode,
                  phoneNumber: lead.customerPhone,
                },
                email: recipientEmail,
              }),
            });
            console.log(`✉️ Email sent to ${recipientEmail}:`, emailResult);
            return emailResult;
          } catch (error) {
            console.error(
              `❌ Failed to send email to ${recipientEmail}:`,
              error
            );
            return null;
          }
        })
      );

      const emailResults = await Promise.all(emailPromises);
      console.log("📨 Email sending results:", emailResults);
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
    console.error("❌ Error in createContactRequest:", error);
    return {
      success: false,
      error: "Failed to create contact request",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
