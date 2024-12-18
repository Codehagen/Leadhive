import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SignUpFormLandscapingAU } from "@/components/landscaping/sections/forms/sign-up-form";

export default function SignUpPageLandscapingAU() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find your perfect landscaping professional
              </h1>
              <p className="text-xl text-muted-foreground">
                Get free proposals from top local landscapers. Compare their
                expertise, services, and pricing to find the perfect match for
                your outdoor space.
              </p>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Pre-screened, experienced landscaping professionals
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Multiple proposals within 24 hours
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                100% free service, no obligations
              </li>
            </ul>
          </div>

          {/* Right side - Sign up form */}
          <div className="relative">
            <BorderBeam className="absolute inset-0 opacity-40" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg border shadow-lg p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  Get Started Today
                </h2>
                <p className="text-muted-foreground">
                  Tell us about your project to receive free landscaping
                  proposals.
                </p>
              </div>
              <SignUpFormLandscapingAU />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
