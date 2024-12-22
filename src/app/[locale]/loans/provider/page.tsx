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
    title: "Real Estate Provider Solutions – Leadhive",
    description:
      "Grow your real estate business with Leadhive. Get high-quality leads and powerful tools to boost your success.",
  });
}

export default function RealEstateProviderPage({ params }: Props) {
  return (
    <main>
      <Header
        industry="real-estate"
        signUpPath={`/${params.locale}/real-estate/provider/sign-up`}
      />
      <HeroSection industry="real-estate" locale={params.locale} />
      <Logos />
      <ScalabilitySection industry="real-estate" />
      <StatsSection industry="real-estate" />
      <FeaturePreview industry="real-estate" />
      <ProviderFooter industry="real-estate" locale={params.locale} />
    </main>
  );
}
