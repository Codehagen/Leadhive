import { constructMetadata } from "@/lib/utils";
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/faq";
import Logos from "@/components/sections/logos";
import PricingPlans from "@/components/sections/plans";

export const metadata = constructMetadata({
  title: "Pricing – Leadhive",
});

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <Logos />
      <PricingPlans />
      <FAQ />
    </>
  );
}
