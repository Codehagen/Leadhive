"use server";

import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

const EmailSchema = z.object({
  subject: z.string(),
  body: z.string(),
  callToAction: z.string(),
});

export interface GenerateEmailParams {
  businessName: string;
  contactName?: string;
  category: string;
  zone: string;
  businessDescription?: string;
}

export async function generateOutreachEmail(params: GenerateEmailParams) {
  try {
    const { object: email } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: EmailSchema,
      prompt: `Generate a personalized outreach email for ${
        params.businessName
      } ${
        params.contactName ? `(contact: ${params.contactName})` : ""
      } in ${params.zone}. They operate in the ${params.category} industry. ${
        params.businessDescription
          ? `Business description: ${params.businessDescription}`
          : ""
      }
      
      The email should:
      1. Be professional but friendly
      2. Highlight the benefits of joining LeadHive as a service provider
      3. Include specific examples relevant to their industry
      4. Have a clear call to action
      5. Be concise (max 200 words)`,
      temperature: 0.7,
    });

    return {
      success: true,
      data: email,
    };
  } catch (error) {
    console.error("Error generating email:", error);
    return {
      success: false,
      error: "Failed to generate email",
    };
  }
}
