import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: {
    template: "%s | LeadHive Eiendomsmegler",
    default:
      "LeadHive Eiendomsmegler - Profesjonell Lead-generering for Eiendomsmeglere",
  },
  description:
    "Generer høykvalitets leads for eiendomsmeglere med LeadHive's spesialiserte markedsføringsløsninger.",
  openGraph: {
    title: "LeadHive Eiendomsmegler",
    description: "Profesjonelle lead-generering løsninger for eiendomsmeglere",
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
