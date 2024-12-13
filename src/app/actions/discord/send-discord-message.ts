"use server";

interface SendMessageProps {
  name: string;
  email: string;
  message: string;
}

export async function sendDiscordMessage(data: SendMessageProps) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_CUSTOMER_SERVICE;

  if (!webhookUrl) {
    console.error("Discord webhook URL is not configured");
    throw new Error("Internal server error");
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "LeadHive Customer Service",
        avatar_url: "https://your-leadhive-logo-url.com/logo.png", // Optional: Add your logo URL
        embeds: [
          {
            title: "📨 New Customer Service Message",
            color: 0x00ff00, // Green color
            fields: [
              {
                name: "Name",
                value: data.name,
                inline: true,
              },
              {
                name: "Email",
                value: data.email,
                inline: true,
              },
              {
                name: "Message",
                value: data.message,
              },
            ],
            footer: {
              text: "LeadHive Customer Service Bot",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending Discord message:", error);
    throw new Error("Failed to send message");
  }
}
