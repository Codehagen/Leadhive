"use client";

import { motion } from "framer-motion";
import { Icons } from "@/components/icons";
import HeroVideoDialog from "@/components/magicui/hero-video";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1];

function HeroPill() {
  return (
    <motion.a
      href="/blog/introduserer-fotovibe"
      className="flex w-auto items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent whitespace-pre"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center text-xs font-medium text-primary sm:text-sm">
        🎉 Nyhet
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm">
        Lansering av Fotovibe
      </p>
      <svg
        width="12"
        height="12"
        className="ml-1"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
          fill="hsl(var(--primary))"
        />
      </svg>
    </motion.a>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
        }}
      >
        <span className="block font-semibold">Profesjonelt Bedriftsfoto</span>
        <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 text-muted-foreground">
          på abonnement
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
        Få profesjonelle bilder og videoer hver måned for din bedrift. Fast
        fotograf, fast pris, ingen overraskelser.
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          <Icons.logo className="h-6 w-6" />
          Bli kontaktet
        </Link>
      </motion.div>
      <motion.p
        className="mt-5 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        Ingen bindingstid. Ingen kredittkort nødvendig.
      </motion.p>
    </>
  );
}

function HeroImage() {
  return (
    <motion.div
      className="relative mx-auto flex w-full items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    >
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="/dashboard.png"
        thumbnailAlt="Fotovibe - Profesjonelt Bedriftsfoto og Video Tjenester"
        className="border rounded-lg shadow-lg max-w-screen-lg mt-16"
      />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="hero" aria-label="Bedriftsfoto og Video Tjenester">
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
        <HeroImage />
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4"></div>
      </div>
    </section>
  );
}
