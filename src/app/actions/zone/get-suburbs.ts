"use server";

import { prisma } from "@/lib/db";

export async function getSuburbsByPostcode(postcode: string) {
  try {
    // Find zones that include this postcode
    const zones = await prisma.zone.findMany({
      where: {
        postalCodes: {
          has: postcode,
        },
        countryId: "AU", // Ensure we only get Australian zones
      },
      select: {
        name: true,
        state: true,
        sa3Name: true,
        postalCodes: true,
      },
    });

    if (!zones.length) {
      return {
        success: true,
        data: [], // No suburbs found for this postcode
      };
    }

    // Map zones to suburb format
    // Using sa3Name as the suburb name since that's what we stored during seeding
    return {
      success: true,
      data: zones.map((zone) => ({
        value: zone.sa3Name,
        label: zone.sa3Name,
        state: zone.state,
      })),
    };
  } catch (error) {
    console.error("Error fetching suburbs:", error);
    return {
      success: false,
      error: "Failed to fetch suburbs",
    };
  }
}
