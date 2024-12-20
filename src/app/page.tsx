import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Logos from "@/components/sections/logos";
import Solution from "@/components/sections/solution";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import CTA from "@/components/sections/cta";
import Footer from "@/components/sections/footer";
import Problem from "@/components/sections/problem";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Logos />
      <Problem />
      <Solution />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
