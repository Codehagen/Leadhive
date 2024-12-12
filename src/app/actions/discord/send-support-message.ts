"use server";

interface SendSupportMessageProps {
  name: string;
  email: string;
  message: string;
}

export async function sendSupportMessage({
  name,
  email,
  message,
}: SendSupportMessageProps) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_SUPPORT;

  if (!webhookUrl) {
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
      body: JSON.stringify({
        username: "LeadHive Support",
        avatar_url: "https://your-leadhive-logo-url.com/logo.png",
        embeds: [
          {
            title: "Ny kundeservice henvendelse",
            color: 0x00ff00,
            fields: [
              {
                name: "Navn",
                value: name,
                inline: true,
              },
              {
                name: "Email",
                value: email,
                inline: true,
              },
              {
                name: "Melding",
                value: message,
              },
            ],
            footer: {
              text: "LeadHive Support System",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord API responded with ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending support message to Discord:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send message",
    };
  }
}
