"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";

interface AddUserToProviderResponse {
  success: boolean;
  error?: string;
  data?: any;
}

export async function addUserToProvider(
  providerId: string,
  userId: string
): Promise<AddUserToProviderResponse> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Check if the provider exists and the current user has access
    const provider = await prisma.provider.findFirst({
      where: {
        id: providerId,
        users: {
          some: {
            id: currentUser.id,
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

    // Add the user to the provider
    const updatedProvider = await prisma.provider.update({
      where: {
        id: providerId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // Update user role to PROVIDER if not already
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "PROVIDER",
      },
    });

    return {
      success: true,
      data: updatedProvider,
    };
  } catch (error) {
    console.error("Error adding user to provider:", error);
    return {
      success: false,
      error: "Failed to add user to provider",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
