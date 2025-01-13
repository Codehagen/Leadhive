import Blog from "@/components/landscaping/sections/blog";
import CTA from "@/components/landscaping/sections/cta";
import FAQ from "@/components/landscaping/sections/faq";
import Features from "@/components/landscaping/sections/features";
import Footer from "@/components/landscaping/sections/footer";
import Header from "@/components/landscaping/sections/header";
import Hero from "@/components/landscaping/sections/hero";
import HowItWorks from "@/components/landscaping/sections/how-it-works";
import Logos from "@/components/landscaping/sections/logos";
import Problem from "@/components/landscaping/sections/problem";
import Solution from "@/components/landscaping/sections/solution";
import Testimonials from "@/components/landscaping/sections/testimonials";
import Pricing from "@/components/landscaping/sections/pricing";

export default function LandscapingPage() {
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
