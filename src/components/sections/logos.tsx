import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const companies = [
  "TheNewYorkTimes",
  "TheWashingtonPost",
  "Forbes",
  "Bloomberg",
  "BusinessInsider",
  "TechCrunch",
  "TheGuardian",
  "Wired",
];

export default function Logos() {
  return (
    <section id="logos" className="">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Featured In
        </h3>
        <div className="relative mt-8">
          <Marquee className="max-w-full [--duration:40s]">
            {companies.map((logo, idx) => (
              <Image
                key={idx}
                width={112}
                height={40}
                src={`https://cdn.magicui.design/press/${logo}.svg`}
                className="h-10 w-28 dark:brightness-0 dark:invert grayscale opacity-30 hover:opacity-60 transition-opacity"
                alt={logo}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}
