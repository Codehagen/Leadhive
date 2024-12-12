"use server";

import { prisma } from "@/lib/db";
import { sendEmail } from "emails";
import LeadNotificationEmail from "emails/lead-notification-email";

/**
 * TODO: Provider Matching Enhancements
 *
 * 1. Add sophisticated matching criteria:
 *    - Match based on provider specialties/services
 *    - Consider provider ratings/performance
 *    - Price range matching
 *
 * 2. Implement real email notifications: DONE
 *    - Set up email service (Resend/SendGrid/etc.)
 *    - Create email templates
 *    - Handle bounce/delivery tracking
 *
 * 3. Add provider preferences:
 *    - Maximum leads per day/week/month
 *    - Budget range preferences
 *    - Preferred service types
 *    - Blackout dates/times
 *
 * 4. Add geographic radius matching:
 *    - Calculate distances between postal codes
 *    - Allow providers to set max travel distance
 *    - Implement geospatial queries
 *
 * 5. Add category matching:
 *    - Match based on service categories
 *    - Provider specialty weighting
 *    - Category-based pricing
 *
 * 6. Add provider availability checks:
 *    - Calendar integration
 *    - Real-time availability updates
 *    - Automatic lead redistribution
 */

interface LeadRequestData {
  name: string;
  email: string;
  phone: string;
  serviceDetails: string;
  postalCode: string;
  categories?: string[];
}

async function notifyProviders(lead: any, zone: any) {
  try {
    // Find providers in the zone
    const providers = await prisma.provider.findMany({
      where: {
        zones: {
          some: {
            id: zone.id,
          },
        },
        status: "ACTIVE",
        // Add any other provider filtering criteria here
      },
      include: {
        users: {
          where: {
            role: "PROVIDER",
          },
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Send email to each provider's users
    const emailPromises = providers.flatMap((provider) =>
      provider.users.map((user) =>
        sendEmail({
          email: user.email!,
          subject: "newLead",
          react: LeadNotificationEmail({
            recipientName: user.name,
            leadInfo: {
              name: lead.customerName,
              address: `${zone.name}, ${zone.country.name}`,
              zipCode: lead.postalCode,
              phoneNumber: lead.customerPhone,
            },
            email: user.email!,
          }),
          marketing: true,
        })
      )
    );

    // Create LeadProvider records
    const leadProviderPromises = providers.map((provider) =>
      prisma.leadProvider.create({
        data: {
          leadId: lead.id,
          providerId: provider.id,
          status: "SENT",
        },
      })
    );

    // Wait for all operations to complete
    const [emailResults, leadProviderResults] = await Promise.all([
      Promise.allSettled(emailPromises),
      Promise.all(leadProviderPromises),
    ]);

    // Log any email failures
    emailResults.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(
          `Failed to send email to provider ${index}:`,
          result.reason
        );
      }
    });

    return {
      success: true,
      providersNotified: providers.length,
    };
  } catch (error) {
    console.error("Error notifying providers:", error);
    return {
      success: false,
      error: "Failed to notify providers",
    };
  }
}

export async function createLeadRequest(data: LeadRequestData) {
  try {
    // First find the zone based on postal code
    const zone = await prisma.zone.findFirst({
      where: {
        postalCodes: {
          has: data.postalCode,
        },
      },
      include: {
        country: true,
      },
    });

    if (!zone) {
      return {
        success: false,
        error: "Could not find a matching zone for your postal code",
      };
    }

    // Create the lead with initial status
    const lead = await prisma.$transaction(async (tx) => {
      // Create the initial lead
      const newLead = await tx.lead.create({
        data: {
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.phone,
          serviceDetails: data.serviceDetails,
          zoneId: zone.id,
          status: "PENDING",
          ...(data.categories && {
            categories: {
              connect: data.categories.map((id) => ({ id })),
            },
          }),
        },
        include: {
          zone: true,
          categories: true,
        },
      });

      // Store this lead request in our audit log
      await tx.auditLog.create({
        data: {
          action: "CREATE_LEAD",
          entity: "LEAD",
          entityId: newLead.id,
          metadata: {
            postalCode: data.postalCode,
            zoneId: zone.id,
            zoneName: zone.name,
            countryCode: zone.country.code,
          },
        },
      });

      return newLead;
    });

    // Notify providers about the new lead
    const notificationResult = await notifyProviders(
      { ...lead, postalCode: data.postalCode },
      zone
    );

    // Return success response with zone information
    return {
      success: true,
      data: {
        ...lead,
        postalCode: data.postalCode,
        zoneName: zone.name,
        countryName: zone.country.name,
        providersNotified: notificationResult.success
          ? notificationResult.providersNotified
          : 0,
      },
      message: notificationResult.success
        ? `Lead request created and ${notificationResult.providersNotified} providers notified`
        : "Lead request created but provider notification failed",
    };
  } catch (error) {
    console.error("Error creating lead request:", error);
    return {
      success: false,
      error: "Failed to create lead request",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
