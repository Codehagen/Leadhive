"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";

export interface CreateProviderData {
  name: string;
  orgnr: string;
  address: string;
  city: string;
  zip: string;
  industry?: string;
  zoneIds: string[];
  categoryIds: string[];
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

    const provider = await prisma.provider.create({
      data: {
        name: data.name,
        orgnr: data.orgnr,
        address: data.address,
        city: data.city,
        zip: data.zip,
        industry: data.industry,
        status: "ACTIVE",
        zones: {
          connect: data.zoneIds.map((id) => ({ id })),
        },
        ...(data.categoryIds && {
          categories: {
            connect: data.categoryIds.map((id) => ({ id })),
          },
        }),
        users: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        zones: true,
        categories: true,
      },
    });

    // Update user role to PROVIDER if not already
    if (user.role !== "PROVIDER") {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "PROVIDER" },
      });
    }

    return {
      success: true,
      data: provider,
    };
  } catch (error) {
    console.error("Error creating provider:", error);
    return {
      success: false,
      error: "Failed to create provider",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
