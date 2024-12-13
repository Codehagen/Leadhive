"use client";

import Marquee from "@/components/magicui/marquee";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary dark:bg-primary/20 dark:text-primary",
        className
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <Image
        width={40}
        height={40}
        src={img || ""}
        alt={name}
        className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Seller in Boston",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        Using {siteConfig.name} to find an agent was so easy.
        <Highlight>I received 3 proposals within 24 hours</Highlight> and found
        the perfect agent for my property. Sold above asking price!
      </p>
    ),
  },
  {
    name: "Emma Rodriguez",
    role: "First-time Home Seller",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        I was nervous about selling my first home, but {siteConfig.name} made it
        simple. <Highlight>The agents were patient and knowledgeable</Highlight>{" "}
        and helped me understand every step of the process.
      </p>
    ),
  },
  {
    name: "David Thompson",
    role: "Home Seller in Miami",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        {siteConfig.name} matched me with the perfect local agent.
        <Highlight>My house sold within two weeks</Highlight> and the whole
        process was completely stress-free.
      </p>
    ),
  },
  {
    name: "Jennifer Chen",
    role: "Home Seller in Seattle",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    description: (
      <p>
        Comparing different agents through {siteConfig.name} was eye-opening.
        <Highlight>Each proposal offered unique strategies</Highlight> for
        selling my home. Found exactly what I was looking for.
      </p>
    ),
  },
  {
    name: "Robert Miller",
    role: "Home Seller in Chicago",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    description: (
      <p>
        The best part about {siteConfig.name}?{" "}
        <Highlight>No pressure or endless phone calls</Highlight>. I could
        review proposals at my own pace and choose the agent I felt most
        comfortable with.
      </p>
    ),
  },
  {
    name: "Maria Garcia",
    role: "Home Seller in Austin",
    img: "https://randomuser.me/api/portraits/women/28.jpg",
    description: (
      <p>
        After trying to sell on my own, I turned to {siteConfig.name}.
        <Highlight>Within days, I had multiple qualified agents</Highlight>{" "}
        competing for my listing. Best decision I could have made.
      </p>
    ),
  },
  {
    name: "James Wilson",
    role: "Home Seller in Denver",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        The quality of agents on {siteConfig.name} impressed me.
        <Highlight>Every proposal was professional and detailed</Highlight>.
        Made choosing the right agent much easier than expected.
      </p>
    ),
  },
  {
    name: "Patricia Lee",
    role: "Home Seller in Portland",
    img: "https://randomuser.me/api/portraits/women/67.jpg",
    description: (
      <p>
        {siteConfig.name} saved me so much time.
        <Highlight>Instead of researching dozens of agents</Highlight>, I got
        matched with pre-screened professionals who knew my neighborhood well.
      </p>
    ),
  },
  {
    name: "Michael Scott",
    role: "Home Seller in Phoenix",
    img: "https://randomuser.me/api/portraits/men/68.jpg",
    description: (
      <p>
        Selling a home is stressful, but {siteConfig.name} made it manageable.
        <Highlight>The agent they matched me with was fantastic</Highlight> and
        got me more than I expected for my home.
      </p>
    ),
  },
  {
    name: "Linda Martinez",
    role: "Home Seller in San Diego",
    img: "https://randomuser.me/api/portraits/women/91.jpg",
    description: (
      <p>
        What a great service! {siteConfig.name} helped me find an agent who
        <Highlight>sold my house $30,000 above asking price</Highlight>. The
        whole process was smooth and professional.
      </p>
    ),
  },
  {
    name: "Thomas Anderson",
    role: "Home Seller in Atlanta",
    img: "https://randomuser.me/api/portraits/men/92.jpg",
    description: (
      <p>
        I appreciated how {siteConfig.name} vetted the agents first.
        <Highlight>Every proposal I received was high-quality</Highlight> and
        showed deep market knowledge. Excellent service!
      </p>
    ),
  },
  {
    name: "Susan Taylor",
    role: "Home Seller in Nashville",
    img: "https://randomuser.me/api/portraits/women/89.jpg",
    description: (
      <p>
        From start to finish, {siteConfig.name} exceeded my expectations.
        <Highlight>
          Found an amazing agent who sold my home in just 5 days
        </Highlight>
        . Couldn't ask for a better experience.
      </p>
    ),
  },
];

export default function Testimonials() {
  return (
    <Section>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          What people are saying{" "}
          <span className="block">about {siteConfig.name}</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Join thousands of happy home sellers
          <br />
          who found their perfect real estate agent through our platform
        </p>
      </div>
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </Section>
  );
}
