"use server";

import { prisma } from "@/lib/db";

interface FindZoneByPostalCodeOptions {
  country?: string;
}

export async function findZoneByPostalCode(
  postalCode: string,
  options: FindZoneByPostalCodeOptions = {}
) {
  try {
    console.log("🔍 Looking up zone for:", { postalCode, options });

    const zone = await prisma.zone.findFirst({
      where: {
        postalCodes: {
          has: postalCode,
        },
        // Only include zones for the specified country if provided
        ...(options.country && {
          country: {
            code: options.country,
          },
        }),
      },
      select: {
        id: true,
        name: true,
        countryId: true,
      },
    });

    if (!zone) {
      console.log("❌ No zone found for:", { postalCode, options });
      return {
        success: false,
        error: "No zone found for this postal code",
      };
    }

    console.log("✅ Found zone:", zone);
    return {
      success: true,
      data: zone,
    };
  } catch (error) {
    console.error("Error finding zone:", error);
    return {
      success: false,
      error: "Failed to find zone",
    };
  }
}
