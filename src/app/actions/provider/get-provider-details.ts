"use server";

import { prisma } from "@/lib/db";

export async function getProviderDetails(id: string) {
  try {
    const provider = await prisma.provider.findUnique({
      where: { id },
      include: {
        users: true,
        zones: true,
        leads: true,
        leadProviders: true,
        paymentInfo: true,
        categories: true,
        Country: true,
        invoices: {
          orderBy: {
            createdAt: "desc",
          },
        },
        transactions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!provider) {
      return {
        success: false,
        error: "Provider not found",
      };
    }

    return {
      success: true,
      data: provider,
    };
  } catch (error) {
    console.error("Error fetching provider details:", error);
    return {
      success: false,
      error: "Failed to fetch provider details",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
