import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: {
    template: "%s | LeadHive Real Estate",
    default: "LeadHive Real Estate - Professional Real Estate Lead Generation",
  },
  description:
    "Generate high-quality real estate leads with LeadHive's specialized real estate marketing solutions.",
  openGraph: {
    title: "LeadHive Real Estate",
    description: "Professional real estate lead generation solutions",
    type: "website",
  },
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="real-estate-layout">
      {/* Real estate specific header can go here */}
      <main>{children}</main>
      {/* Real estate specific footer can go here */}
    </div>
  );
}
