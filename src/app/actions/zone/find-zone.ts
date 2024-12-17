"use server";

import { prisma } from "@/lib/db";

interface FindZoneByPostalCodeOptions {
  country?: string;
}

interface ZoneInfo {
  id: string;
  name: string;
  city?: string;
}

export async function findZoneByPostalCode(
  postalCode: string,
  options: FindZoneByPostalCodeOptions = {}
) {
  try {
    console.log("🔍 Looking up zone for:", { postalCode, options });

    // First find the zone
    const zone = await prisma.zone.findFirst({
      where: {
        postalCodes: {
          has: postalCode,
        },
        ...(options.country && {
          country: {
            code: options.country,
          },
        }),
      },
      select: {
        id: true,
        name: true,
        sa3Name: true, // This will be our city for Australian postcodes
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
      data: {
        id: zone.id,
        name: zone.name,
        city: zone.sa3Name || undefined,
      },
    };
  } catch (error) {
    console.error("Error finding zone:", error);
    return {
      success: false,
      error: "Failed to find zone",
    };
  }
}
