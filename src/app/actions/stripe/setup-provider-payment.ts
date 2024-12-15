"use server";

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function setupProviderPayment(providerId: string) {
  try {
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
      include: { paymentInfo: true },
    });

    if (!provider) {
      return { success: false, error: "Provider not found" };
    }

    // Create or get Stripe customer
    const customer = await stripe.customers.create({
      email: provider.contactEmail,
      name: provider.name,
      metadata: {
        providerId: provider.id,
      },
    });

    // Update payment info with Stripe customer ID
    await prisma.paymentInfo.update({
      where: { providerId: provider.id },
      data: {
        accountId: customer.id,
      },
    });

    // Create Stripe setup intent
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      mode: "setup",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/providers/setup-complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/providers/setup-payment?error=cancelled`,
    });

    return {
      success: true,
      url: session.url,
    };
  } catch (error) {
    console.error("Error setting up provider payment:", error);
    return {
      success: false,
      error: "Failed to setup payment processing",
    };
  }
}
