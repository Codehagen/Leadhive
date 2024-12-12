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

interface CreateContactRequestData {
  name: string;
  phone: string;
  message?: string;
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

    if (!zoneResult.success || !zoneResult.data) {
      console.error("❌ No zone found for postal code:", data.postalCode);
      return {
        success: false,
        error: "No service zone found for this postal code",
      };
    }

    const zone = await prisma.zone.findUnique({
      where: { id: zoneResult.data.id },
      include: { country: true },
    });
    console.log("🏠 Found zone:", zone);

    if (!zone) {
      console.error("❌ Zone not found in database");
      return {
        success: false,
        error: "Zone not found",
      };
    }

    // Create the lead
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
        zone: {
          connect: { id: zone.id },
        },
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

    // Find providers in the zone
    const providers = await prisma.provider.findMany({
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
          console.error(`❌ Failed to send email to ${recipientEmail}:`, error);
          return null;
        }
      })
    );

    const emailResults = await Promise.all(emailPromises);
    console.log("📨 Email sending results:", emailResults);

    // Create audit log
    await createAuditLog({
      action: "CREATE_LEAD",
      entityId: lead.id,
      metadata: {
        customerName: data.name,
        postalCode: data.postalCode,
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
