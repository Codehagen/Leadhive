"use server";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { createAuditLog } from "../audit/create-audit-log";

interface ChargeForLeadResult {
  success: boolean;
  error?: string;
  transactionId?: string;
}

export async function chargeForLead(
  providerId: string,
  leadId: string
): Promise<ChargeForLeadResult> {
  try {
    // Get provider's info including payment info and country
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
      include: {
        paymentInfo: true,
        zones: {
          include: {
            country: {
              include: {
                paymentSettings: true,
              },
            },
          },
        },
      },
    });

    if (!provider || !provider.paymentInfo?.accountId) {
      console.error("Provider or payment info not found:", providerId);
      return {
        success: false,
        error: "Provider payment information not found",
      };
    }

    // Get payment settings for the provider's country
    const countrySettings = provider.zones[0]?.country?.paymentSettings;
    if (!countrySettings) {
      console.error("No payment settings found for provider's country");
      return {
        success: false,
        error: "Payment settings not configured",
      };
    }

    // Convert price to cents for Stripe
    const amountInCents = Math.round(countrySettings.leadPrice * 100);

    // Get the default payment method for the customer
    const paymentMethods = await stripe.paymentMethods.list({
      customer: provider.paymentInfo.accountId,
      type: "card",
    });

    if (!paymentMethods.data.length) {
      return {
        success: false,
        error: "No payment method found for provider",
      };
    }

    // Create a payment intent using the default payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: countrySettings.currency.toLowerCase(),
      customer: provider.paymentInfo.accountId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      metadata: {
        providerId,
        leadId,
      },
      description: `Lead charge for provider ${provider.name}`,
    });

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        providerId,
        leadId,
        amount: countrySettings.leadPrice,
        currency: countrySettings.currency,
        status: "PENDING",
        paymentMethod: "card",
      },
    });

    // Create audit log
    await createAuditLog({
      action: "PROCESS_PAYMENT",
      entityId: transaction.id,
      metadata: {
        providerId,
        leadId,
        amount: countrySettings.leadPrice,
        currency: countrySettings.currency,
        paymentIntentId: paymentIntent.id,
      },
    });

    // Check payment status
    if (
      paymentIntent.status === "succeeded" ||
      paymentIntent.status === "processing"
    ) {
      // Update transaction status
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: "COMPLETED" },
      });

      return {
        success: true,
        transactionId: transaction.id,
      };
    } else {
      // Handle failed payment
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: "FAILED" },
      });

      return {
        success: false,
        error: `Payment failed with status: ${paymentIntent.status}`,
      };
    }
  } catch (error) {
    console.error("Error charging for lead:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Payment processing failed",
    };
  }
}
