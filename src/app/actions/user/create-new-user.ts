"use server";

import { prisma } from "@/lib/db";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { CreateUserInput, UserRole } from "@/lib/types";

export async function createNewUser(): Promise<CreateUserInput | null> {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error("No authenticated user found");
      return null;
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
      console.error("Could not get user details from Clerk");
      return null;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
      },
    });

    if (existingUser) {
      console.log("User already exists in database");
      return existingUser as CreateUserInput;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress ?? null;
    const name =
      `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || null;

    // Create new user in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      // Check if this is the first user in the system
      const userCount = await tx.user.count();

      // First user becomes ADMIN, others become CUSTOMER
      const role = userCount === 0 ? UserRole.ADMIN : UserRole.CUSTOMER;

      // Create the user
      const createdUser = await tx.user.create({
        data: {
          id: userId,
          email,
          name,
          avatar: clerkUser.imageUrl,
          language: "norwegian",
          role,
          isSuperUser: role === UserRole.ADMIN,
          consentToTerms: false,
          consentToMarketing: false,
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
        },
      });

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId: createdUser.id,
          action: "USER_LOGIN",
          entity: "USER",
          entityId: createdUser.id,
          metadata: {
            event: "user_created",
            provider: "clerk",
          },
          ipAddress: null,
          userAgent: null,
        },
      });

      // Update Clerk user metadata
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role,
        },
        privateMetadata: {
          databaseId: createdUser.id,
        },
        unsafeMetadata: {
          language: "norwegian",
          theme: "light",
        },
      });

      return createdUser as CreateUserInput;
    });

    console.log("Created new user:", newUser.id);
    return newUser;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
}

export async function isUserAdmin(): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === UserRole.ADMIN;
}

export async function getUserRole(): Promise<UserRole | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return (user?.role as UserRole) || UserRole.CUSTOMER;
}
