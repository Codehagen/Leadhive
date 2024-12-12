"use server";

import { prisma } from "@/lib/db";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        parentCategory: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      data: categories.map((category) => ({
        value: category.id,
        label: category.parentCategory
          ? `${category.parentCategory.name} - ${category.name}`
          : category.name,
        description: category.description,
      })),
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: "Failed to fetch categories",
    };
  }
}
