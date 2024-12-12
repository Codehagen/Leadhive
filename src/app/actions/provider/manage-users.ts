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
    console.log("🔄 Attempting to add user to provider:", {
      providerId,
      userId,
    });

    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
    });

    if (!provider) {
      console.error("❌ Provider not found:", providerId);
      return {
        success: false,
        error: "Provider not found",
      };
    }

    // Update the user's role and connect to provider
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: "PROVIDER",
        providers: {
          connect: { id: providerId },
        },
      },
    });

    console.log("✅ Successfully added user to provider:", updatedUser);

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("❌ Error adding user to provider:", error);
    return {
      success: false,
      error: "Failed to add user to provider",
    };
  }
}
