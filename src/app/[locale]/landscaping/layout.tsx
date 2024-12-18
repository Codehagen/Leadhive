import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: {
    template: "%s | LeadHive Landscaping",
    default: "LeadHive Landscaping - Professional Landscaping Lead Generation",
  },
  description:
    "Generate high-quality landscaping leads with LeadHive's specialized landscaping marketing solutions.",
  openGraph: {
    title: "LeadHive Landscaping",
    description: "Professional landscaping lead generation solutions",
    type: "website",
  },
};

export default function LandscapingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landscaping-layout">
      {/* Landscaping specific header can go here */}
      <main>{children}</main>
      {/* Landscaping specific footer can go here */}
    </div>
  );
}
