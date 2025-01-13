import { Search } from "lucide-react";
import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CtaSection() {
  return (
    <Section id="cta" className="bg-primary/10 rounded-xl py-16">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Klar til å finne din <span className="block">perfekte megler?</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Få gratis tilbud fra toppmeglere i ditt område.
          <br />
          Ingen forpliktelser, ingen press.
        </p>
      </div>
      <div className="flex flex-col w-full sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
        <Link
          href="/no/eiendomsmegler/registrer"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          <Search className="h-6 w-6" />
          Få Gratis Tilbud
        </Link>
      </div>
    </Section>
  );
}
