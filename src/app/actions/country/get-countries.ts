"use server";

import { prisma } from "@/lib/db";

export async function getCountries() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      data: countries.map((country) => ({
        code: country.code,
        name: country.name,
        id: country.id,
      })),
    };
  } catch (error) {
    console.error("Error fetching countries:", error);
    return {
      success: false,
      error: "Failed to fetch countries",
    };
  }
}
