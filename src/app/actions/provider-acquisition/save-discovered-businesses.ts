"use server";

import { prisma } from "@/lib/db";

interface BusinessData {
  name: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  description: string;
  relevanceScore: number;
  category: string;
  yearsFounded?: number;
  employeeCount?: string;
  socialProfiles?: string[];
}

export interface SaveBusinessesParams {
  businesses: BusinessData[];
  zoneId: string;
  countryId: string;
}

export async function saveDiscoveredBusinesses(params: SaveBusinessesParams) {
  try {
    console.log("💾 Saving discovered businesses:", params);

    const savedBusinesses = await Promise.all(
      params.businesses.map(async (business) => {
        return await prisma.discoveredBusiness.create({
          data: {
            name: business.name,
            website: business.website,
            email: business.email,
            phone: business.phone,
            address: business.address,
            description: business.description,
            relevanceScore: business.relevanceScore,
            category: business.category,
            yearsFounded: business.yearsFounded,
            employeeCount: business.employeeCount,
            socialProfiles: business.socialProfiles || [],
            zoneId: params.zoneId,
            countryId: params.countryId,
            status: "DISCOVERED",
          },
        });
      })
    );

    console.log(`✅ Saved ${savedBusinesses.length} businesses`);

    return {
      success: true,
      data: savedBusinesses,
    };
  } catch (error) {
    console.error("❌ Error saving businesses:", error);
    return {
      success: false,
      error: "Failed to save businesses",
    };
  }
}
