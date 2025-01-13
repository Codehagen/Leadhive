import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SignUpFormRealEstateNO } from "@/components/real-estate/norwegian/sections/forms/sign-up-form";

export default function SignUpPageRealEstateNO() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Finn din perfekte eiendomsmegler
              </h1>
              <p className="text-xl text-muted-foreground">
                Få gratis tilbud fra lokale toppmeglere. Sammenlign deres
                erfaring, strategier og resultater for å finne din perfekte
                match.
              </p>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Forhåndsvurderte, erfarne lokale meglere
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Flere tilbud innen 24 timer
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                100% gratis tjeneste, ingen forpliktelser
              </li>
            </ul>
          </div>

          {/* Right side - Sign up form */}
          <div className="relative">
            <BorderBeam className="absolute inset-0 opacity-40" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg border shadow-lg p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  Kom i Gang i Dag
                </h2>
                <p className="text-muted-foreground">
                  Fortell oss om din eiendom for å motta gratis meglertilbud.
                </p>
              </div>
              <SignUpFormRealEstateNO />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
