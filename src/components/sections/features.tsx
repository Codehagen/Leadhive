import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { siteConfig } from "@/lib/config";
import { BadgeCheck, Clock, Coins, ShieldCheck } from "lucide-react";

function FeaturesPill() {
  return (
    <div className="mx-auto mb-8 flex w-fit items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 ring-1 ring-primary/30">
      <p className="text-xs font-medium text-primary sm:text-sm">
        ✨ Why Choose {siteConfig.name}
      </p>
    </div>
  );
}

const data = [
  {
    id: 1,
    title: "Pre-screened Agents",
    content:
      "We partner only with experienced, top-performing agents who have a proven track record of success in your local market.",
    image: "/dashboard.png",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Save Time",
    content:
      "No need to spend hours researching agents. We'll match you with the right professionals based on your specific needs and location.",
    image: "/dashboard.png",
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "100% Free Service",
    content:
      "Our service is completely free for property owners. Get multiple proposals from top agents without any cost or obligation.",
    image: "/dashboard.png",
    icon: <Coins className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Safe & Secure",
    content:
      "Your information is protected and only shared with verified agents. We prioritize your privacy throughout the entire process.",
    image: "/dashboard.png",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
  },
];

export default function BenefitsSection() {
  return (
    <Section>
      <FeaturesPill />
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          The smarter way to <span className="block">find your agent</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Skip the hassle of endless searching and interviewing.
          <br />
          Let us connect you with pre-vetted professionals who match your needs.
        </p>
      </div>
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
