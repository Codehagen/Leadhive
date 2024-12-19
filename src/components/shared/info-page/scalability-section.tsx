import { TrendingUp } from "lucide-react";
import { MetricsChart } from "./metrics-chart";
import { AreaChartStacked } from "@/components/templates/charts/area-chart-stacked";

export function ScalabilitySection() {
  return (
    <section id="stats" className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 py-6 mx-auto">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4 " />
            <h2 className="text-lg font-medium tracking-tight">SCALABILITY</h2>
          </div>
          <h4 className="text-[42px] font-medium mb-2 text-balance max-w-3xl mx-auto tracking-tighter">
            Manage all your campaigns with confidence
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Infinitely scale your campaigns with zero issues, with a 99.9%
              uptime SLA for our web platform and API. Dub is built to handle
              everything you want to track, from millions of links to billions
              of clicks.
            </p>
          </div>
          <MetricsChart />
        </div>
      </div>
    </section>
  );
}
