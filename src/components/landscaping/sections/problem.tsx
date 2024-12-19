import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheck, CalendarRange, Handshake } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

function ProcessPill() {
  return (
    <div className="mx-auto mb-8 flex w-fit items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 ring-1 ring-primary/30">
      <p className="text-xs font-medium text-primary sm:text-sm">
        ✨ How It Works
      </p>
    </div>
  );
}

const steps = [
  {
    title: "1. Tell us about your needs",
    description:
      "Share basic details about your property and what you're looking to achieve. It takes less than 2 minutes.",
    icon: ClipboardCheck,
  },
  {
    title: "2. Get matched with landscapers",
    description:
      "We'll connect you with top local landscapers who specialize in your area and property type.",
    icon: CalendarRange,
  },
  {
    title: "3. Compare and choose",
    description:
      "Review personalized proposals from landscapers and choose the best fit for your needs. No pressure, no obligations.",
    icon: Handshake,
  },
];

export default function ProcessSection() {
  return (
    <Section>
      <ProcessPill />
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Find your perfect landscaper{" "}
          <span className="block">in three simple steps</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Quick, easy, and completely free
          <br />
          No commitment required
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
