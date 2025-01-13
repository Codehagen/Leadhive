import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheck, CalendarRange, Handshake } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

function ProcessPill() {
  return (
    <div className="mx-auto mb-8 flex w-fit items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 ring-1 ring-primary/30">
      <p className="text-xs font-medium text-primary sm:text-sm">
        ✨ Slik Fungerer Det
      </p>
    </div>
  );
}

const steps = [
  {
    title: "1. Fortell oss om dine behov",
    description:
      "Del grunnleggende detaljer om din eiendom og hva du ønsker å oppnå. Det tar mindre enn 2 minutter.",
    icon: ClipboardCheck,
  },
  {
    title: "2. Bli koblet med meglere",
    description:
      "Vi kobler deg med de beste lokale meglerne som spesialiserer seg på ditt område og eiendomstype.",
    icon: CalendarRange,
  },
  {
    title: "3. Sammenlign og velg",
    description:
      "Gjennomgå personlige tilbud fra meglere og velg den som passer best for dine behov. Ingen press, ingen forpliktelser.",
    icon: Handshake,
  },
];

export default function ProcessSection() {
  return (
    <Section>
      <ProcessPill />
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Finn din perfekte megler{" "}
          <span className="block">i tre enkle trinn</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Raskt, enkelt og helt gratis
          <br />
          Ingen forpliktelser
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {steps.map((step, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
