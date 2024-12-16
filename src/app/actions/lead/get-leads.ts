"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";

export async function getLeads() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const leads = await prisma.lead.findMany({
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            contactName: true,
            contactEmail: true,
          },
        },
        zone: {
          select: {
            id: true,
            name: true,
            country: true,
          },
        },
        categories: true,
        Transaction: true,
        leadProviders: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: leads,
    };
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    return {
      success: false,
      error: "Failed to fetch leads",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
