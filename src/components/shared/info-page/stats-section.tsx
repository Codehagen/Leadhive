"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  BarChart,
  Zap,
  DollarSign,
  LineChart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsSectionProps {
  industry: "real-estate" | "landscaping";
}

const industryContent = {
  "real-estate": {
    stats: [
      { label: "QUALIFIED LEADS / MONTH", value: "2,500+" },
      { label: "AVERAGE CONVERSION RATE", value: "76%" },
      { label: "REVENUE GROWTH", value: "45%" },
    ],
    support: {
      title: "Dedicated success team",
      description:
        "Get personalized guidance from our real estate experts. We help optimize your lead funnel and maximize conversions.",
    },
    growth: {
      title: "Proven business growth",
      description:
        "Our real estate partners see an average of 45% revenue growth within the first year. Join hundreds of successful agents growing their business.",
      metrics: [
        { label: "Average Revenue Growth", value: "45%" },
        { label: "Client Retention Rate", value: "92%" },
        { label: "ROI on Marketing", value: "3.2x" },
      ],
    },
  },
  landscaping: {
    stats: [
      { label: "QUALIFIED LEADS / MONTH", value: "1,800+" },
      { label: "AVERAGE CONVERSION RATE", value: "28%" },
      { label: "REVENUE GROWTH", value: "40%" },
    ],
    support: {
      title: "Growth specialists",
      description:
        "Work with our landscaping business experts who understand your market. Get strategies to scale your operations efficiently.",
    },
    growth: {
      title: "Measurable results",
      description:
        "Our landscaping partners achieve an average of 40% revenue growth within the first year. Join successful contractors scaling their operations.",
      metrics: [
        { label: "Average Revenue Growth", value: "40%" },
        { label: "Client Retention Rate", value: "89%" },
        { label: "ROI on Marketing", value: "2.8x" },
      ],
    },
  },
};

function StatsCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl text-muted-foreground">
          {value}
        </div>
        <div className="mt-2 text-sm font-medium text-muted-foreground">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsSection({ industry }: StatsSectionProps) {
  const content = industryContent[industry];

  return (
    <section className="container px-4 py-24">
      <div className="grid gap-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {content.stats.map((stat, index) => (
            <StatsCard key={index} label={stat.label} value={stat.value} />
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {content.support.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {content.support.description}
                </p>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">Fast Response</div>
                        <div className="text-sm text-muted-foreground">
                          Average response time under 2 hours
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">
                        Dedicated Manager
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {content.growth.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {content.growth.description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {content.growth.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center rounded-lg border bg-background p-3 text-center"
                    >
                      <div className="text-lg font-semibold text-primary">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
