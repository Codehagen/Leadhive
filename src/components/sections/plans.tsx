import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingPlansProps {
  industry?: "real-estate" | "landscaping";
}

export default function PricingPlans({ industry }: PricingPlansProps) {
  const getIndustryPlans = () => {
    switch (industry) {
      case "real-estate":
        return [
          {
            name: "Basic",
            price: "199",
            period: "/lead",
            description: "Perfect for individual agents",
            features: [
              "Qualified property seller leads",
              "Lead contact information",
              "Property details and requirements",
              "Basic CRM integration",
              "Email notifications",
              "Standard support",
            ],
            cta: "Get Started",
            href: `/au/real-estate/provider/sign-up?plan=basic`,
          },
          {
            name: "Professional",
            price: "299",
            period: "/lead",
            description: "Ideal for growing agencies",
            features: [
              "All Basic features",
              "Priority lead matching",
              "Advanced CRM integration",
              "Lead scoring",
              "Performance analytics",
              "Priority support",
              "Team collaboration tools",
            ],
            cta: "Get Started",
            href: `/au/real-estate/provider/sign-up?plan=professional`,
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "For large agencies and brokerages",
            features: [
              "All Professional features",
              "Custom lead volume",
              "Dedicated account manager",
              "API access",
              "Custom integrations",
              "24/7 premium support",
              "White-label options",
            ],
            cta: "Contact Sales",
            href: `/au/real-estate/provider/contact`,
          },
        ];
      case "landscaping":
        return [
          {
            name: "Basic",
            price: "149",
            period: "/lead",
            description: "Perfect for small contractors",
            features: [
              "Qualified landscaping leads",
              "Lead contact information",
              "Project requirements",
              "Basic job management",
              "Email notifications",
              "Standard support",
            ],
            cta: "Get Started",
            href: `/au/landscaping/provider/sign-up?plan=basic`,
          },
          {
            name: "Professional",
            price: "249",
            period: "/lead",
            description: "Ideal for growing businesses",
            features: [
              "All Basic features",
              "Priority lead matching",
              "Advanced job management",
              "Lead qualification",
              "Performance tracking",
              "Priority support",
              "Team management",
            ],
            cta: "Get Started",
            href: `/au/landscaping/provider/sign-up?plan=professional`,
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "For large landscaping companies",
            features: [
              "All Professional features",
              "Custom lead volume",
              "Dedicated account manager",
              "API access",
              "Custom integrations",
              "24/7 premium support",
              "White-label options",
            ],
            cta: "Contact Sales",
            href: `/au/landscaping/provider/contact`,
          },
        ];
      default:
        return [];
    }
  };

  const plans = getIndustryPlans();

  if (plans.length === 0) return null;

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-lg border p-6",
                plan.popular
                  ? "border-primary shadow-lg"
                  : "border-border bg-card"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
                    ${plan.price}
                    {plan.period && (
                      <span className="text-sm font-normal text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <ul className="space-y-2.5 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <a href={plan.href}>{plan.cta}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
