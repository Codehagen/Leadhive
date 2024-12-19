import IndustryHeader from "@/components/shared/industry-header";

interface Props {
  children: React.ReactNode;
  params: {
    industry: string;
  };
}

export default function ProviderLayout({ children, params }: Props) {
  // Validate industry param
  const industries = ["real-estate", "landscaping"] as const;
  const industry = industries.includes(params.industry as any)
    ? (params.industry as "real-estate" | "landscaping")
    : null;

  if (!industry) {
    return null;
  }

  return (
    <>
      <IndustryHeader
        industry={industry}
        signUpPath={`/au/${industry}/provider/sign-up`}
      />
      <main>{children}</main>
    </>
  );
}
