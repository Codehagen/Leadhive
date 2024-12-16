"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";

export async function getProviders() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const providers = await prisma.provider.findMany({
      include: {
        zones: true,
        categories: true,
        paymentInfo: true,
        leads: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: providers,
    };
  } catch (error) {
    console.error("❌ Error fetching providers:", error);
    return {
      success: false,
      error: "Failed to fetch providers",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
