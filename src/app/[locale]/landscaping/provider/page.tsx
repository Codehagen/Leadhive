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
    title: "Landscaping Provider Solutions – Leadhive",
    description:
      "Grow your landscaping business with Leadhive. Get high-quality leads and powerful tools to boost your success.",
  });
}

export default function LandscapingProviderPage({ params }: Props) {
  return (
    <main>
      {/* <Header
        industry="landscaping"
        signUpPath={`/${params.locale}/landscaping/provider/sign-up`}
      />
      <Hero industry="landscaping" />
      <Features industry="landscaping" />
      <Benefits industry="landscaping" />
      <CTA industry="landscaping" /> */}
      <Footer />
    </main>
  );
}
