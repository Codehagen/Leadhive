"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Building2,
  Home,
  Sprout,
  Construction,
  HeartPulse,
  Zap,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const ease = [0.16, 1, 0.3, 1];

interface IndustryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function IndustryCard({ title, description, icon, href }: IndustryCardProps) {
  return (
    <Link href={href}>
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="space-y-2">
          <div className="mb-2 rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

function HeroPill() {
  return (
    <motion.div
      className="flex w-auto items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center text-xs font-medium text-primary sm:text-sm">
        ✨ New
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm">
        AI-Powered Lead Generation
      </p>
    </motion.div>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-3xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
      >
        <span className="block font-semibold">Connect with Your</span>
        <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Perfect Industry Expert
        </span>
      </motion.h1>
      <motion.p
        className="mx-auto max-w-xl text-center text-lg leading-7 text-muted-foreground sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease }}
      >
        LeadHive connects you with verified professionals across multiple
        industries. Choose your sector to get started.
      </motion.p>
    </div>
  );
}

function IndustryGrid() {
  const industries = [
    {
      title: "Real Estate",
      description: "Connect with top local real estate agents",
      icon: <Home className="w-6 h-6 text-primary" />,
      href: "/au/real-estate",
    },
    {
      title: "Landscaping",
      description: "Find professional landscapers and gardeners",
      icon: <Sprout className="w-6 h-6 text-primary" />,
      href: "/au/landscaping/",
    },
    {
      title: "Construction",
      description: "Connect with licensed builders and contractors",
      icon: <Construction className="w-6 h-6 text-primary" />,
      href: "/au/construction/",
    },
    {
      title: "Healthcare",
      description: "Find healthcare providers and specialists",
      icon: <HeartPulse className="w-6 h-6 text-primary" />,
      href: "/au/healthcare/",
    },
    {
      title: "Electrical",
      description: "Connect with certified electricians",
      icon: <Zap className="w-6 h-6 text-primary" />,
      href: "/au/electrical/",
    },
    {
      title: "Loans",
      description: "Find mortgage brokers and lenders",
      icon: <Wallet className="w-6 h-6 text-primary" />,
      href: "/au/loans/",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease }}
    >
      {industries.map((industry) => (
        <IndustryCard key={industry.title} {...industry} />
      ))}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="hero" aria-label="Choose Your Industry">
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 pb-16 sm:px-6 sm:pt-40 md:pt-48 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <IndustryGrid />
      </div>
    </section>
  );
}
