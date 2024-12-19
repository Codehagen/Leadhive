import { constructMetadata } from "@/lib/utils";
import { notFound } from "next/navigation";
import Hero from "@/components/sections/provider/hero";
import Features from "@/components/sections/provider/features";
import Benefits from "@/components/sections/provider/benefits";
import CTA from "@/components/sections/provider/cta";

interface Props {
  params: {
    industry: string;
  };
}

export function generateMetadata({ params }: Props) {
  const industries = ["real-estate", "landscaping"] as const;
  if (!industries.includes(params.industry as any)) {
    return {};
  }

  const industryTitle =
    params.industry === "real-estate" ? "Real Estate" : "Landscaping";

  return constructMetadata({
    title: `${industryTitle} Provider Solutions – Leadhive`,
    description: `Grow your ${industryTitle.toLowerCase()} business with Leadhive. Get high-quality leads and powerful tools to boost your success.`,
  });
}

export default function ProviderPage({ params }: Props) {
  // Validate industry param
  const industries = ["real-estate", "landscaping"] as const;
  const industry = industries.includes(params.industry as any)
    ? (params.industry as "real-estate" | "landscaping")
    : null;

  if (!industry) {
    notFound();
  }

  return (
    <>
      <Hero industry={industry} />
      <Features industry={industry} />
      <Benefits industry={industry} />
      <CTA industry={industry} />
    </>
  );
}
