"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface HeroSectionProps {
  industry: "real-estate" | "landscaping";
  locale: string;
}

const industryContent = {
  "real-estate": {
    title: "Grow Your Real Estate Business",
    subtitle: "Connect with motivated sellers and expand your portfolio",
    description:
      "Get high-quality leads and powerful tools to grow your real estate business with Leadhive.",
    stats: [
      { value: "10k+", label: "Active Agents" },
      { value: "50k+", label: "Leads Generated" },
      { value: "95%", label: "Client Satisfaction" },
    ],
  },
  landscaping: {
    title: "Expand Your Landscaping Business",
    subtitle:
      "Connect with property owners looking for professional landscaping",
    description:
      "Access qualified leads and business tools to grow your landscaping company with Leadhive.",
    stats: [
      { value: "5k+", label: "Active Contractors" },
      { value: "30k+", label: "Projects Delivered" },
      { value: "92%", label: "Client Satisfaction" },
    ],
  },
};

const ease = [0.16, 1, 0.3, 1];

export function HeroSection({ industry, locale }: HeroSectionProps) {
  const content = industryContent[industry];

  return (
    <section id="hero" aria-label={content.title}>
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 pb-16 sm:px-6 sm:pt-40 md:pt-48 lg:px-8">
        <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden">
          <motion.h1
            className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
            initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease,
            }}
          >
            <span className="block font-semibold">{content.title}</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 text-muted-foreground">
              {content.subtitle}
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto max-w-xl text-center text-lg leading-7 text-muted-foreground sm:text-xl sm:leading-9 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease,
            }}
          >
            {content.description}
          </motion.p>
        </div>

        <motion.div
          className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease }}
        >
          <Link
            href={`/${locale}/${industry}/provider/sign-up`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto text-background flex gap-2"
            )}
          >
            <Search className="h-6 w-6" />
            Get Started Now
          </Link>
          <Link
            href={`/${locale}/${industry}/provider/pricing`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full sm:w-auto"
            )}
          >
            View Pricing
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12"
        >
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
