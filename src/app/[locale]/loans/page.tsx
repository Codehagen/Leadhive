import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Timer, Wallet } from "lucide-react";
import Link from "next/link";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function LoansPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Wallet className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Coming Soon to Your Area
            </h1>
            <p className="text-xl text-muted-foreground">
              We're currently building our network of trusted financial
              professionals in your region.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Timer className="w-5 h-5" />
              <span>Expected Launch: Q2 2025</span>
            </div>
            <div className="space-y-2 text-sm">
              <p>Our loan service will include:</p>
              <ul className="space-y-1">
                <li>✓ Licensed mortgage brokers</li>
                <li>✓ Multiple loan options</li>
                <li>✓ Competitive rates</li>
                <li>✓ Detailed loan comparisons</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Want to be notified when we launch in your area?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}