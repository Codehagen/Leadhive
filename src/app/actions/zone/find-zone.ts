"use server";

import { prisma } from "@/lib/db";

export async function findZoneByPostalCode(postalCode: string) {
  try {
    const zone = await prisma.zone.findFirst({
      where: {
        postalCodes: {
          has: postalCode,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!zone) {
      return {
        success: false,
        error: "No service zone found for this postal code",
      };
    }

    return {
      success: true,
      data: zone,
    };
  } catch (error) {
    console.error("Error finding zone:", error);
    return {
      success: false,
      error: "Failed to check service zone",
    };
  }
}
