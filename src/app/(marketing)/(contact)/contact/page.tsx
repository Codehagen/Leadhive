import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { BorderBeam } from "@/components/magicui/border-beam";
import { CustomerServiceForm } from "@/components/marketing/customer-service-form";

export default function CustomerServicePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Need help with LeadHive?
              </h1>
              <p className="text-xl text-muted-foreground">
                Our dedicated support team is here to help you. Send us a
                message, and we'll help you get the most out of LeadHive.
              </p>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                24/7 support for Enterprise customers
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Response within 24 hours for all inquiries
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Dedicated account manager for Pro and Enterprise
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Comprehensive help center with guides and tips
              </li>
            </ul>
          </div>

          {/* Right side - Contact form */}
          <div className="relative">
            <BorderBeam className="absolute inset-0 opacity-40" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg border shadow-lg p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  Send us a message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below, and we'll get back to you within 24
                  hours
                </p>
              </div>
              <CustomerServiceForm />
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  Need faster answers? Check our{" "}
                  <a href="/help" className="text-primary hover:underline">
                    help center
                  </a>{" "}
                  for common questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
