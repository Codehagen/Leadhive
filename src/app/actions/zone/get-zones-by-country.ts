"use server";

import { prisma } from "@/lib/db";

export async function getZonesByCountry(countryCode: string) {
  try {
    console.log("🌍 Fetching zones for country:", countryCode);

    const zones = await prisma.zone.findMany({
      where: {
        country: {
          code: countryCode,
        },
      },
      select: {
        id: true,
        name: true,
        state: true,
        sa3Name: true, // For Australian zones
        sa4Name: true,
        region: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    console.log(`✅ Found ${zones.length} zones`);

    return {
      success: true,
      data: zones.map((zone) => ({
        id: zone.id,
        name: zone.name,
        // For AU zones, use SA3/SA4 names
        state: zone.state || zone.sa4Name || zone.sa3Name || zone.region,
      })),
    };
  } catch (error) {
    console.error("❌ Error fetching zones:", error);
    return {
      success: false,
      error: "Failed to fetch zones",
    };
  }
}
