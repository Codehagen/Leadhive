"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Bell, Calendar, Users } from "lucide-react";

interface FeaturePreviewProps {
  industry: "real-estate" | "landscaping";
}

const industryContent = {
  "real-estate": {
    title: "Everything You Need to Succeed in Real Estate",
    description:
      "Powerful tools and features designed specifically for real estate professionals",
    features: [
      {
        icon: Users,
        title: "Lead Management",
        description:
          "Efficiently manage and track potential clients through your sales pipeline",
      },
      {
        icon: BarChart2,
        title: "Performance Analytics",
        description:
          "Track your success with detailed insights and performance metrics",
      },
      {
        icon: Bell,
        title: "Smart Notifications",
        description: "Get instant alerts for new leads and important updates",
      },
      {
        icon: Calendar,
        title: "Appointment Scheduling",
        description: "Streamline your showing and meeting scheduling process",
      },
    ],
  },
  landscaping: {
    title: "Essential Tools for Landscaping Success",
    description:
      "Comprehensive features tailored for landscaping professionals",
    features: [
      {
        icon: Users,
        title: "Project Management",
        description:
          "Efficiently manage multiple landscaping projects and client relationships",
      },
      {
        icon: BarChart2,
        title: "Business Analytics",
        description: "Track project performance and business growth metrics",
      },
      {
        icon: Bell,
        title: "Lead Alerts",
        description:
          "Receive instant notifications for new project opportunities",
      },
      {
        icon: Calendar,
        title: "Project Scheduling",
        description: "Organize your team's schedule and project timeline",
      },
    ],
  },
};

export function FeaturePreview({ industry }: FeaturePreviewProps) {
  const content = industryContent[industry];

  return (
    <section className="container space-y-16 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {content.description}
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-lg border bg-background p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-medium">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {feature.description}
            </p>
            <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-primary" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
