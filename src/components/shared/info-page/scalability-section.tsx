import {
  TrendingUp,
  Users,
  Building2,
  Globe2,
  Briefcase,
  Workflow,
  Building,
  MapPin,
} from "lucide-react";
import { MetricsChart } from "./metrics-chart";
import { AreaChartStacked } from "@/components/templates/charts/area-chart-stacked";

interface ScalabilitySectionProps {
  industry: "real-estate" | "landscaping";
}

const industryContent = {
  "real-estate": {
    title: "Scale your real estate business",
    description:
      "Grow your real estate portfolio with confidence. Our platform is built to handle your business growth, from managing multiple properties to tracking numerous client relationships.",
    features: [
      {
        icon: Building2,
        text: "Multiple property types support",
      },
      {
        icon: MapPin,
        text: "Multi-location coverage",
      },
      {
        icon: Users,
        text: "Team collaboration tools",
      },
      {
        icon: Globe2,
        text: "Market expansion ready",
      },
    ],
  },
  landscaping: {
    title: "Grow your landscaping company",
    description:
      "Expand your landscaping operations seamlessly. Our platform scales with your business, helping you manage more projects and client relationships efficiently.",
    features: [
      {
        icon: Briefcase,
        text: "Project management tools",
      },
      {
        icon: Users,
        text: "Team coordination",
      },
      {
        icon: Workflow,
        text: "Workflow optimization",
      },
      {
        icon: Building,
        text: "Commercial & residential support",
      },
    ],
  },
};

export function ScalabilitySection({ industry }: ScalabilitySectionProps) {
  const content = industryContent[industry];

  return (
    <section id="scalability" className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 py-6 mx-auto">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <h2 className="text-lg font-medium tracking-tight">SCALABILITY</h2>
          </div>
          <h4 className="text-[42px] font-medium mb-2 text-balance max-w-3xl mx-auto tracking-tighter">
            {content.title}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              {content.description}
            </p>
            <ul className="space-y-3">
              {content.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="rounded-lg bg-primary/10 p-1">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] w-full">
            <MetricsChart />
          </div>
        </div>
      </div>
    </section>
  );
}
