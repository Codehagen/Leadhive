import { HeroSection } from "@/components/shared/info-page/hero-section";
import { FeaturePreview } from "@/components/shared/info-page/feature-preview";
import { LogoCloud } from "@/components/shared/info-page/logo-cloud";
import { ScalabilitySection } from "@/components/shared/info-page/scalability-section";
import { StatsSection } from "@/components/shared/info-page/stats-section";

export default function EnterprisePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturePreview />
        <LogoCloud />
        <ScalabilitySection />
        <StatsSection />
      </main>
    </div>
  );
}
