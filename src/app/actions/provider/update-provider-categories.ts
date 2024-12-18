"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";
import { revalidatePath } from "next/cache";

interface UpdateProviderCategoriesParams {
  providerId: string;
  categoryId: string;
  action: "add" | "remove";
}

export async function updateProviderCategories({
  providerId,
  categoryId,
  action,
}: UpdateProviderCategoriesParams) {
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

    // Verify the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    // Update provider categories
    const updatedProvider = await prisma.provider.update({
      where: { id: providerId },
      data: {
        categories: {
          [action === "add" ? "connect" : "disconnect"]: { id: categoryId },
        },
      },
      include: {
        categories: true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: action === "add" ? "CREATE_CATEGORY" : "DELETE_CATEGORY",
        entity: "CATEGORY",
        entityId: categoryId,
        metadata: {
          providerId,
          categoryName: category.name,
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
    console.error("Error updating provider categories:", error);
    return {
      success: false,
      error: "Failed to update categories",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
