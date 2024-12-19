import { constructMetadata } from "@/lib/utils";
import { HeroSection } from "@/components/shared/info-page/hero-section";
import { FeaturePreview } from "@/components/shared/info-page/feature-preview";
import { StatsSection } from "@/components/shared/info-page/stats-section";
import { ScalabilitySection } from "@/components/shared/info-page/scalability-section";
import Header from "@/components/shared/industry-header";
import Footer from "@/components/sections/footer";
import Logos from "@/components/sections/logos";
import { ProviderFooter } from "@/components/shared/info-page/provider-footer";

interface Props {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: Props) {
  return constructMetadata({
    title: "Landscaping Provider Solutions – Leadhive",
    description:
      "Grow your landscaping business with Leadhive. Get high-quality leads and powerful tools to boost your success.",
  });
}

export default function LandscapingProviderPage({ params }: Props) {
  return (
    <main>
      <Header
        industry="landscaping"
        signUpPath={`/${params.locale}/landscaping/provider/sign-up`}
      />
      <HeroSection industry="landscaping" locale={params.locale} />
      <Logos />
      <ScalabilitySection industry="landscaping" />
      <StatsSection industry="landscaping" />
      <FeaturePreview industry="landscaping" />
      <ProviderFooter industry="landscaping" locale={params.locale} />
    </main>
  );
}
