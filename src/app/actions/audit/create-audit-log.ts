"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "../user/get-current-user";
import { AuditAction } from "@prisma/client";

interface CreateAuditLogParams {
  action: AuditAction;
  entityId?: string;
  entity?: string;
  metadata?: Record<string, any>;
}

export async function createAuditLog({
  action,
  entityId,
  entity = "LEAD",
  metadata,
}: CreateAuditLogParams) {
  try {
    const user = await getCurrentUser();

    await prisma.auditLog.create({
      data: {
        action,
        entityId,
        entity,
        metadata,
        userId: user?.id,
        ipAddress: "", // Could be added through headers in a middleware
        userAgent: "", // Could be added through headers in a middleware
      },
    });
  } catch (error) {
    console.error("Error creating audit log:", error);
    // We don't throw here to prevent breaking the main flow
  }
}
