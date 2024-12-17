"use server";

import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

const BusinessSchema = z.object({
  name: z.string().describe("Business name"),
  website: z.string().url().optional().describe("Business website URL"),
  email: z.string().email().optional().describe("Business contact email"),
  phone: z.string().optional().describe("Business phone number"),
  address: z.string().optional().describe("Business physical address"),
  description: z
    .string()
    .describe("Brief description of the business and its services"),
  relevanceScore: z.number().min(0).max(100).describe(`
    Relevance score (0-100) based on:
    - Business size and reputation (30%): Number of employees, years in business, market presence
    - Online presence and reviews (20%): Website quality, social media, review ratings
    - Service area coverage (20%): How well they cover the target zone
    - Industry demand (20%): Local market demand for their services
    - Growth potential (10%): Ability to handle more leads and grow
  `),
  category: z.string().describe("Primary business category"),
  yearsFounded: z.number().optional().describe("Year the business was founded"),
  employeeCount: z
    .string()
    .optional()
    .describe("Approximate number of employees (e.g., '1-10', '11-50', '50+')"),
  socialProfiles: z
    .array(z.string())
    .optional()
    .describe("Social media profile URLs"),
});

export interface DiscoverBusinessesParams {
  zone: string;
  categories: string[];
  state?: string;
  country: string;
}

export async function discoverBusinesses(params: DiscoverBusinessesParams) {
  try {
    console.log("🔍 Starting business discovery with params:", params);

    const { object: businesses } = await generateObject({
      model: openai("gpt-4o-mini"),
      output: "array",
      schema: BusinessSchema,
      prompt: `You are an expert business analyst tasked with discovering potential service providers in ${
        params.zone
      }, ${params.state || ""}, ${params.country}.

      Focus on finding established businesses in these categories: ${params.categories.join(
        ", "
      )}.

      For each business:
      1. Provide accurate and realistic business details (name, contact info, web presence)
      2. Ensure the business actually exists in the specified zone
      3. Calculate a detailed relevance score based on:
         - Business size and reputation (30%): Larger, established businesses score higher
         - Online presence and reviews (20%): Strong digital presence and positive reviews
         - Service area coverage (20%): Coverage of ${params.zone} area
         - Industry demand (20%): Local market demand for ${params.categories.join(
           "/"
         )} services
         - Growth potential (10%): Ability to handle more leads

      Important:
      - Focus on businesses that would benefit from lead generation
      - Prioritize businesses with good online presence
      - Include mix of large and medium-sized businesses
      - Ensure accurate contact information
      - Consider local market conditions
      - Look for businesses with growth potential

      Generate 5-10 high-quality business prospects that match these criteria.`,
      temperature: 0.7,
    });

    console.log(`✅ Generated ${businesses.length} business prospects`);
    return {
      success: true,
      data: businesses,
    };
  } catch (error) {
    console.error("❌ Error discovering businesses:", error);
    return {
      success: false,
      error: "Failed to discover businesses",
    };
  }
}
