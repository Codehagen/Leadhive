"use server";

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "../user/get-current-user";

export async function refundTransaction(transactionId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Get transaction details
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        provider: {
          include: {
            paymentInfo: true,
          },
        },
      },
    });

    if (!transaction) {
      return {
        success: false,
        error: "Transaction not found",
      };
    }

    if (transaction.status !== "COMPLETED") {
      return {
        success: false,
        error: "Can only refund completed transactions",
      };
    }

    // Process refund through Stripe
    const refund = await stripe.refunds.create({
      payment_intent: transaction.stripePaymentIntentId,
      reason: "requested_by_customer",
    });

    // Update transaction status
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: "REFUNDED",
        refundId: refund.id,
        refundedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "REFUND_TRANSACTION",
        entityId: transactionId,
        entity: "TRANSACTION",
        metadata: {
          amount: transaction.amount,
          currency: transaction.currency,
          refundId: refund.id,
        },
        userId: user.id,
      },
    });

    return {
      success: true,
      data: refund,
    };
  } catch (error) {
    console.error("Error processing refund:", error);
    return {
      success: false,
      error: "Failed to process refund",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
