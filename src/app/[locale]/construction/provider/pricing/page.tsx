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
    title: "Real Estate Provider Pricing – Leadhive",
    description:
      "Flexible pricing plans for real estate providers on Leadhive. Choose the plan that best fits your business needs.",
  });
}

export default function RealEstateProviderPricingPage({ params }: Props) {
  return (
    <main>
      <Header
        industry="real-estate"
        signUpPath={`/${params.locale}/real-estate/provider/sign-up`}
      />
      <Pricing industry="real-estate" />
      <Logos />
      <PricingPlans industry="real-estate" />
      <FAQ />
      <Footer />
    </main>
  );
}
