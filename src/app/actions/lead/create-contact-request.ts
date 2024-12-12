"use server";

import { prisma } from "@/lib/db";

/**
 * TODO: Provider Matching Enhancements
 *
 * 1. Add sophisticated matching criteria:
 *    - Match based on provider specialties/services
 *    - Consider provider ratings/performance
 *    - Price range matching
 *
 * 2. Implement real email notifications:
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

    // Comment this section in/out to test provider matching
    /*
    // Match and notify providers
    const matchingResult = await matchAndNotifyProviders(
      lead.id,
      lead.zoneId,
      data.postalCode
    );

    if (!matchingResult.success) {
      console.warn("Provider matching failed:", matchingResult.error);
    } else {
      console.log(`Notified ${matchingResult.providersNotified} providers`);
    }
    */

    // Return success response with zone information
    return {
      success: true,
      data: {
        ...lead,
        postalCode: data.postalCode,
        zoneName: zone.name,
        countryName: zone.country.name,
        // providersNotified: matchingResult?.providersNotified ?? 0,
      },
      message: "Lead request created successfully",
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
