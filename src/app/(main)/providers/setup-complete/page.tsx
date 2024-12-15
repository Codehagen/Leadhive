"use client";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

interface SetupCompletePageProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function SetupCompletePage({
  searchParams,
}: SetupCompletePageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    console.log("No session ID provided");
    redirect("/providers?setup=error");
  }

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Processing Stripe session:", session.id);

    if (!session?.customer) {
      console.log("No customer in session");
      redirect("/providers?setup=error");
    }

    const customerId = session.customer.toString();

    // Find the most recent pending payment info
    const paymentInfo = await prisma.paymentInfo.findFirst({
      where: {
        accountStatus: "pending",
      },
      include: {
        provider: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!paymentInfo) {
      console.log("No pending payment info found");
      return redirect("/providers?setup=error");
    }

    console.log(
      `Updating payment info for provider: ${paymentInfo.providerId}`
    );

    try {
      // Update the payment info with the Stripe customer ID
      await prisma.paymentInfo.update({
        where: {
          id: paymentInfo.id,
        },
        data: {
          accountId: customerId,
          hasPaymentMethod: true,
          accountStatus: "active",
        },
      });

      // Update provider status to ACTIVE
      await prisma.provider.update({
        where: {
          id: paymentInfo.providerId,
        },
        data: {
          status: "ACTIVE",
        },
      });

      console.log("Setup completed successfully");
      return redirect("/providers?setup=success");
    } catch (dbError) {
      console.error("Database update failed:", dbError);
      return redirect("/providers?setup=error");
    }
  } catch (error) {
    console.error("Setup completion failed:", error);
    return redirect("/providers?setup=error");
  }
}
