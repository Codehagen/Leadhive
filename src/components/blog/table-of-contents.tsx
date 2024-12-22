"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useCurrentAnchor from "@/lib/blog/use-current-anchor";
import { cn } from "@/lib/utils";

export default function TableOfContents({
  items,
}: {
  items: {
    title: string;
    slug: string;
  }[];
}) {
  const currentAnchor = useCurrentAnchor();

  return (
    <div className="relative grid gap-4 border-l-2 border-border">
      {items.map((item) => {
        const isActive = currentAnchor === item.slug;
        return (
          <div key={item.slug} className="relative">
            {isActive && (
              <motion.div
                layoutId="active-indicator"
                className="absolute -left-0.5 h-full border-l-2 border-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <Link
              href={`#${item.slug}`}
              className={cn(
                "-ml-0.5 block pl-4 text-sm text-muted-foreground transition-colors hover:text-foreground",
                {
                  "text-foreground": isActive,
                }
              )}
            >
              {item.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
