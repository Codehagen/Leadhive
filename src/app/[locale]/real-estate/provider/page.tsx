import { constructMetadata } from "@/lib/utils";
import Hero from "@/components/sections/provider/hero";
import Features from "@/components/sections/provider/features";
import Benefits from "@/components/sections/provider/benefits";
import CTA from "@/components/sections/provider/cta";
import Header from "@/components/shared/industry-header";
import Footer from "@/components/sections/footer";

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
      <Hero industry="real-estate" />
      <Features industry="real-estate" />
      <Benefits industry="real-estate" />
      <CTA industry="real-estate" />
      <Footer />
    </main>
  );
}
