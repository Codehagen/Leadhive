"use server";

import { prisma } from "@/lib/db";
import { findZoneByPostalCode } from "../zone/find-zone";
import { sendEmail } from "emails";
import ProviderSetupEmail from "emails/provider-setup-email";
import { sendDiscordNotification } from "../discord/send-discord-notification";

interface CreateProviderRequestData {
  name: string;
  orgnr: string;
  address: string;
  city: string;
  zip: string;
  categoryIds: string[];
  contactName: string;
  contactEmail: string;
  country: string;
}

export async function createProviderRequest(data: CreateProviderRequestData) {
  try {
    console.log("🏢 Received provider sign-up request:", data);

    // Find zone based on postal code with country
    const zoneResult = await findZoneByPostalCode(data.zip, {
      country: data.country,
    });
    console.log("🌍 Zone lookup result:", zoneResult);

    if (!zoneResult.success || !zoneResult.data) {
      console.error("❌ No zone found for postal code:", data.zip);
      return {
        success: false,
        error: "No service zone found for this postal code",
      };
    }

    // Create provider with PENDING_ONBOARDING status
    const provider = await prisma.provider.create({
      data: {
        name: data.name,
        orgnr: data.orgnr,
        address: data.address,
        city: data.city,
        zip: data.zip,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        status: "PENDING_ONBOARDING",
        zones: {
          connect: { id: zoneResult.data.id },
        },
        categories: {
          connect: data.categoryIds.map((id) => ({ id })),
        },
        paymentInfo: {
          create: {
            paymentProvider: "stripe",
            accountId: "",
            accountStatus: "pending",
            hasPaymentMethod: false,
          },
        },
      },
      include: {
        zones: true,
        categories: true,
        paymentInfo: true,
      },
    });

    console.log("✅ Provider request created:", provider);

    // Send confirmation email to provider
    // try {
    //   await sendEmail({
    //     email: provider.contactEmail,
    //     subject: "providerSignupRequest",
    //     react: ProviderSetupEmail({
    //       providerName: provider.name,
    //       recipientName: provider.contactName,
    //       setupUrl: "#", // We'll update this once approved
    //       email: provider.contactEmail,
    //     }),
    //   });
    //   console.log("📤 Confirmation email sent to provider");
    // } catch (emailError) {
    //   console.error("Failed to send confirmation email:", emailError);
    //   // Continue even if email fails
    // }

    // Send Discord notification for new provider request
    await sendDiscordNotification({
      username: "LeadHive Notification",
      avatar_url: "https://your-leadhive-logo-url.com/logo.png",
      embeds: [
        {
          title: "🆕 New Provider Sign-up Request",
          description: `A new provider has requested to join LeadHive`,
          color: 0x00ff00,
          fields: [
            {
              name: "Business Name",
              value: provider.name,
              inline: true,
            },
            {
              name: "Contact Name",
              value: provider.contactName,
              inline: true,
            },
            {
              name: "Email",
              value: provider.contactEmail,
              inline: true,
            },
            {
              name: "Address",
              value: `${provider.address}, ${provider.city} ${provider.zip}`,
              inline: false,
            },
            {
              name: "Zone",
              value: provider.zones[0].name,
              inline: true,
            },
            {
              name: "Categories",
              value: provider.categories.map((cat) => cat.name).join(", "),
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    });

    return {
      success: true,
      data: {
        id: provider.id,
        name: provider.name,
        status: provider.status,
      },
    };
  } catch (error) {
    console.error("❌ Error creating provider request:", error);
    return {
      success: false,
      error: "Failed to submit provider request",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
