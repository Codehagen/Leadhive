import Blog from "@/components/real-estate/sections/blog";
import CTA from "@/components/real-estate/sections/cta";
import FAQ from "@/components/real-estate/sections/faq";
import Features from "@/components/real-estate/sections/features";
import Footer from "@/components/real-estate/sections/footer";
import Header from "@/components/real-estate/sections/header";
import Hero from "@/components/real-estate/sections/hero";
import HowItWorks from "@/components/real-estate/sections/how-it-works";
import Logos from "@/components/real-estate/sections/logos";
import Problem from "@/components/real-estate/sections/problem";
import Solution from "@/components/real-estate/sections/solution";
import Testimonials from "@/components/real-estate/sections/testimonials";
import Pricing from "@/components/real-estate/sections/pricing";

export default function RealEstatePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Logos />
      <Problem />
      <Solution />
      <Testimonials />
      {/* <Pricing /> */}
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
