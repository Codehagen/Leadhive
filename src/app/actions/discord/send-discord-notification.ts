"use server";

import { DiscordWebhookMessage } from "@/lib/discord.types";

interface SendDiscordNotificationResponse {
  success: boolean;
  error?: string;
}

export async function sendDiscordNotification(
  message: DiscordWebhookMessage
): Promise<SendDiscordNotificationResponse> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_LEADS_NOTIFICATION;

  if (!webhookUrl) {
    console.error("❌ Discord webhook URL not configured");
    return {
      success: false,
      error: "Discord webhook URL is not configured",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Discord API responded with ${response.status}`);
    }

    console.log("✅ Discord notification sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Failed to send Discord notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
