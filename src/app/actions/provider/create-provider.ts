"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";
import { findZoneByPostalCode } from "../zone/find-zone";

export interface CreateProviderData {
  name: string;
  orgnr: string;
  address: string;
  city: string;
  zip: string;
  industry?: string;
  categoryIds: string[];
  contactName: string;
  contactEmail: string;
}

export async function createProvider(data: CreateProviderData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    console.log("🏢 Creating provider with data:", data);

    // Find zone based on postal code
    const zoneResult = await findZoneByPostalCode(data.zip);
    console.log("🌍 Zone lookup result:", zoneResult);

    if (!zoneResult.success || !zoneResult.data) {
      console.error("❌ No zone found for postal code:", data.zip);
      return {
        success: false,
        error: "No service zone found for this postal code",
      };
    }

    // Create provider with automatic zone connection
    const provider = await prisma.provider.create({
      data: {
        name: data.name,
        orgnr: data.orgnr,
        address: data.address,
        city: data.city,
        zip: data.zip,
        industry: data.industry,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        status: "ACTIVE",
        zones: {
          connect: { id: zoneResult.data.id },
        },
        categories: {
          connect: data.categoryIds.map((id) => ({ id })),
        },
        users: {
          connect: { id: user.id },
        },
      },
      include: {
        zones: true,
        categories: true,
        users: true,
      },
    });

    console.log("✅ Provider created with zone:", provider);

    // Update user role if needed
    if (user.role !== "PROVIDER") {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          role: "PROVIDER",
          name: data.contactName,
          email: data.contactEmail,
        },
      });
    }

    return {
      success: true,
      data: provider,
    };
  } catch (error) {
    console.error("❌ Error creating provider:", error);
    return {
      success: false,
      error: "Failed to create provider",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
