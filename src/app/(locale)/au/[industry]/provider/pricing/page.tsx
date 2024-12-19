import { constructMetadata } from "@/lib/utils";
import { notFound } from "next/navigation";
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/faq";
import Logos from "@/components/sections/logos";
import PricingPlans from "@/components/sections/plans";

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
    title: `${industryTitle} Provider Pricing – Leadhive`,
    description: `Flexible pricing plans for ${industryTitle.toLowerCase()} providers on Leadhive. Choose the plan that best fits your business needs.`,
  });
}

export default function ProviderPricingPage({ params }: Props) {
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
      <Pricing industry={industry} />
      <Logos />
      <PricingPlans industry={industry} />
      <FAQ />
    </>
  );
}
