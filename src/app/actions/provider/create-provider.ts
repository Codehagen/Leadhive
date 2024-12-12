"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";
import { addUserToProvider } from "./manage-users";

export interface CreateProviderData {
  name: string;
  orgnr: string;
  address: string;
  city: string;
  zip: string;
  industry?: string;
  zoneIds: string[];
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

    // Update user details
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.contactName,
        email: data.contactEmail,
        role: "PROVIDER", // Update role immediately
      },
    });

    // Create provider without users
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
          connect: data.zoneIds.map((id) => ({ id })),
        },
        categories: {
          connect: data.categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        zones: true,
        categories: true,
      },
    });

    // Add the user to the provider using the separate action
    const userResult = await addUserToProvider(provider.id, user.id);
    if (!userResult.success) {
      // Handle error if needed
      console.error("Failed to add user to provider:", userResult.error);
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
