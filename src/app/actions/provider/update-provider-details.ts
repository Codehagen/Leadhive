"use server";

import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface UpdateProviderDetailsInput {
  id: string;
  name?: string;
  orgnr?: string;
  address?: string;
  zip?: string;
  city?: string;
  maxUsers?: number;
  industry?: string;
  contactEmail?: string;
  contactName?: string;
  status?: "ACTIVE" | "PENDING_ONBOARDING" | "INACTIVE";
}

export async function updateProviderDetails(input: UpdateProviderDetailsInput) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const provider = await prisma.provider.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        orgnr: input.orgnr,
        address: input.address,
        zip: input.zip,
        city: input.city,
        maxUsers: input.maxUsers,
        industry: input.industry,
        contactEmail: input.contactEmail,
        contactName: input.contactName,
        status: input.status,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/providers/${input.id}`);

    return {
      success: true,
      data: provider,
    };
  } catch (error) {
    console.error("Error updating provider details:", error);
    return {
      success: false,
      error: "Failed to update provider details",
    };
  }
}
