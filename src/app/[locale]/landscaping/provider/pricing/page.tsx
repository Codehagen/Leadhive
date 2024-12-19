import { constructMetadata } from "@/lib/utils";
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/faq";
import Logos from "@/components/sections/logos";
import PricingPlans from "@/components/sections/plans";
import Header from "@/components/shared/industry-header";
import Footer from "@/components/sections/footer";

interface Props {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: Props) {
  return constructMetadata({
    title: "Landscaping Provider Pricing – Leadhive",
    description:
      "Flexible pricing plans for landscaping providers on Leadhive. Choose the plan that best fits your business needs.",
  });
}

export default function LandscapingProviderPricingPage({ params }: Props) {
  return (
    <main>
      <Header
        industry="landscaping"
        signUpPath={`/${params.locale}/landscaping/provider/sign-up`}
      />
      <Pricing industry="landscaping" />
      <Logos />
      <PricingPlans industry="landscaping" />
      <FAQ />
      <Footer />
    </main>
  );
}
