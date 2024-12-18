"use client";

import { useState } from "react";
import { ZoneSelector } from "./components/zone-selector";
import { BusinessDiscovery } from "./components/business-discovery";
import { OutreachPlanner } from "./components/outreach-planner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { saveDiscoveredBusinesses } from "@/app/actions/provider-acquisition/save-discovered-businesses";
import { toast } from "sonner";

interface CategoryInfo {
  id: string;
  label: string;
}

interface BusinessData {
  name: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  description: string;
  relevanceScore: number;
  category: string;
  yearsFounded?: number;
  employeeCount?: string;
  socialProfiles?: string[];
}

type Step = {
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    title: "Select Target Area",
    description: "Choose your target zone and business categories",
  },
  {
    title: "Discover Businesses",
    description: "Find and select potential businesses to contact",
  },
  {
    title: "Plan Outreach",
    description: "Create and customize outreach campaigns",
  },
];

export default function ProviderAcquisitionPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<CategoryInfo[]>(
    []
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [zoneName, setZoneName] = useState<string>("");
  const [selectedBusinesses, setSelectedBusinesses] = useState<BusinessData[]>(
    []
  );
  const [countryId, setCountryId] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const handleZoneSelect = (
    zoneId: string,
    country: string,
    name: string,
    countryId: string
  ) => {
    console.log("🌍 Zone selected:", { zoneId, country, name, countryId });
    setSelectedZoneId(zoneId);
    setSelectedCountry(country);
    setZoneName(name);
    setCountryId(countryId);
  };

  const handleCategoriesChange = (
    categories: { value: string; label: string }[]
  ) => {
    console.log("📑 Categories changed:", categories);
    setSelectedCategories(
      categories.map((c) => ({ id: c.value, label: c.label }))
    );
  };

  const handleBusinessSelect = (businesses: BusinessData[]) => {
    setSelectedBusinesses(businesses);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedZoneId && selectedCategories.length > 0;
      case 1:
        return selectedBusinesses.length > 0;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1 && canProceed()) {
      // If moving from step 1 to 2, save the businesses
      if (currentStep === 1) {
        setIsSaving(true);
        try {
          const result = await saveDiscoveredBusinesses({
            businesses: selectedBusinesses,
            zoneId: selectedZoneId!,
            countryId: countryId,
          });

          if (!result.success) {
            toast.error("Failed to save businesses");
            return;
          }
          toast.success(
            `Saved ${selectedBusinesses.length} businesses successfully`
          );
          setCurrentStep(currentStep + 1);
        } catch (error) {
          console.error("Error saving businesses:", error);
          toast.error("Failed to save businesses");
        } finally {
          setIsSaving(false);
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Provider Acquisition
        </h1>
        <p className="text-muted-foreground">
          Discover and reach out to potential service providers in your target
          zones.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex justify-between">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className={`flex flex-col items-center w-full ${
              index !== STEPS.length - 1 ? "relative" : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                index <= currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium">{step.title}</div>
              <div className="text-sm text-muted-foreground">
                {step.description}
              </div>
            </div>
            {index !== STEPS.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-[2px] ${
                  index < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <ZoneSelector
              onZoneSelect={handleZoneSelect}
              onCategoriesChange={handleCategoriesChange}
              selectedCategories={selectedCategories.map((c) => c.id)}
            />
          )}
          {currentStep === 1 && (
            <BusinessDiscovery
              key={selectedZoneId}
              zoneId={selectedZoneId}
              selectedCategories={selectedCategories.map((c) => c.id)}
              selectedCountry={selectedCountry}
              zoneName={zoneName}
              categoryLabels={selectedCategories.map((c) => c.label)}
              onBusinessSelect={handleBusinessSelect}
            />
          )}
          {currentStep === 2 && (
            <OutreachPlanner
              selectedBusinesses={selectedBusinesses}
              zoneName={zoneName}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0 || isSaving}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            currentStep === STEPS.length - 1 || !canProceed() || isSaving
          }
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : currentStep === STEPS.length - 1 ? (
            "Finish"
          ) : (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
