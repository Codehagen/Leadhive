"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";

export async function getLeadDetails(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
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
          include: {
            country: true,
          },
        },
        categories: true,
        Transaction: true,
        leadProviders: {
          include: {
            provider: {
              select: {
                id: true,
                name: true,
                contactName: true,
                contactEmail: true,
                status: true,
              },
            },
          },
          orderBy: {
            sentAt: "desc",
          },
        },
      },
    });

    if (!lead) {
      return {
        success: false,
        error: "Lead not found",
      };
    }

    return {
      success: true,
      data: lead,
    };
  } catch (error) {
    console.error("❌ Error fetching lead details:", error);
    return {
      success: false,
      error: "Failed to fetch lead details",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
