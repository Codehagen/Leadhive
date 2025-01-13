import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { constructMetadata } from "@/lib/blog/constructMetadata";

export const metadata = constructMetadata({
  title: "Compare Loan Offers - Free Quotes | Leadhive",
  description:
    "Compare loan offers from trusted lenders. Get multiple quotes, compare interest rates, and find the best financing solution for your needs. Free service.",
});

export default function LoansSignUpPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="relative">
            <BorderBeam className="absolute inset-0 opacity-40" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg border shadow-lg p-12 space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Coming Soon
              </h1>
              <p className="text-xl text-muted-foreground">
                We're working hard to bring you our loan services sign-up
                portal. Check back soon for updates or contact us for more
                information.
              </p>
              <div className="pt-4">
                <Link href="/">
                  <Button size="lg">Return to Homepage</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
