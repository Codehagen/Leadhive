import { constructMetadata } from "@/lib/utils";
import { HeroSection } from "@/components/shared/info-page/hero-section";
import { FeaturePreview } from "@/components/shared/info-page/feature-preview";
import { LogoCloud } from "@/components/shared/info-page/logo-cloud";
import { ScalabilitySection } from "@/components/shared/info-page/scalability-section";
import { StatsSection } from "@/components/shared/info-page/stats-section";
import Header from "@/components/shared/industry-header";
import Footer from "@/components/sections/footer";
import Logos from "@/components/sections/logos";

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
      <HeroSection />
      <FeaturePreview />
      <Logos />
      <ScalabilitySection />
      <StatsSection />
      <Footer />
    </main>
  );
}
