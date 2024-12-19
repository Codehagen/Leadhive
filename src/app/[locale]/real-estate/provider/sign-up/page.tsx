import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProviderSignUpForm } from "@/components/shared/info-page/provider-sign-up-form";

interface GetLeadsPageProps {
  params: {
    locale: string;
  };
}

export default function GetLeadsPage({ params }: GetLeadsPageProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Grow your real estate business
              </h1>
              <p className="text-xl text-muted-foreground">
                Join our network of top real estate agents and get connected
                with quality leads in your area.
              </p>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Access to pre-qualified property leads
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Dedicated support and resources
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Flexible commission structure
              </li>
            </ul>
          </div>

          {/* Right side - Sign up form */}
          <div className="relative">
            <BorderBeam className="absolute inset-0 opacity-40" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg border shadow-lg p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  Join Our Network Today
                </h2>
                <p className="text-muted-foreground">
                  Register your real estate business to start receiving quality
                  leads.
                </p>
              </div>
              <ProviderSignUpForm
                industry="real-estate"
                locale={params.locale}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
