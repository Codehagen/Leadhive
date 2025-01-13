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
  User,
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
        ✨ Nyhet
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm">
        AI-Drevet Leadgenerering
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
        <span className="block font-semibold">Kom i Kontakt med Din</span>
        <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Perfekte Bransjeekspert
        </span>
      </motion.h1>
      <motion.p
        className="mx-auto max-w-xl text-center text-lg leading-7 text-muted-foreground sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease }}
      >
        LeadHive kobler deg med verifiserte fagfolk på tvers av flere bransjer.
        Velg din sektor for å komme i gang.
      </motion.p>
    </div>
  );
}

function IndustryGrid() {
  const industries = [
    {
      title: "Eiendomsmegler",
      description: "Finn den beste eiendomsmegleren i ditt område",
      icon: <Home className="w-6 h-6 text-primary" />,
      href: "/no/eiendomsmegler",
    },
    {
      title: "Boliglån",
      description: "Sammenlign og finn de beste boliglånene",
      icon: <Wallet className="w-6 h-6 text-primary" />,
      href: "/no/boliglan",
    },
    {
      title: "Forsikring",
      description: "Få tilbud på forsikring tilpasset dine behov",
      icon: <Building2 className="w-6 h-6 text-primary" />,
      href: "/no/forsikring",
    },
    {
      title: "Strøm",
      description: "Sammenlign strømavtaler og finn beste pris",
      icon: <Zap className="w-6 h-6 text-primary" />,
      href: "/no/strom",
    },
    {
      title: "Advokat",
      description: "Kom i kontakt med erfarne advokater",
      icon: <User className="w-6 h-6 text-primary" />,
      href: "/no/advokat",
    },
    {
      title: "Mobilabonnement",
      description: "Sammenlign og finn beste mobilabonnement",
      icon: <Sprout className="w-6 h-6 text-primary" />,
      href: "/no/mobilabonnement",
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
    <section id="hero" aria-label="Velg Din Bransje">
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 pb-16 sm:px-6 sm:pt-40 md:pt-48 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <IndustryGrid />
      </div>
    </section>
  );
}
