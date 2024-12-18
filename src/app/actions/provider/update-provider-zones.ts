"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";
import { revalidatePath } from "next/cache";

interface UpdateProviderZonesParams {
  providerId: string;
  zoneId: string;
  action: "add" | "remove";
}

export async function updateProviderZones({
  providerId,
  zoneId,
  action,
}: UpdateProviderZonesParams) {
  try {
    // Get current user and verify permissions
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Verify the provider exists and user has access
    const provider = await prisma.provider.findFirst({
      where: {
        id: providerId,
        users: {
          some: {
            id: user.id,
          },
        },
      },
    });

    if (!provider) {
      return {
        success: false,
        error: "Provider not found or access denied",
      };
    }

    // Verify the zone exists
    const zone = await prisma.zone.findUnique({
      where: { id: zoneId },
    });

    if (!zone) {
      return {
        success: false,
        error: "Zone not found",
      };
    }

    // Update provider zones
    const updatedProvider = await prisma.provider.update({
      where: { id: providerId },
      data: {
        zones: {
          [action === "add" ? "connect" : "disconnect"]: { id: zoneId },
        },
      },
      include: {
        zones: true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: action === "add" ? "CREATE_ZONE" : "DELETE_ZONE",
        entity: "ZONE",
        entityId: zoneId,
        metadata: {
          providerId,
          zoneName: zone.name,
          action,
        },
      },
    });

    // Revalidate the provider page
    revalidatePath(`/dashboard/providers/${providerId}`);

    return {
      success: true,
      data: updatedProvider,
    };
  } catch (error) {
    console.error("Error updating provider zones:", error);
    return {
      success: false,
      error: "Failed to update zones",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
