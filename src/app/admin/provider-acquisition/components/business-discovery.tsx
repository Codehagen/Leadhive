"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, RefreshCcw, Globe, Mail, Phone } from "lucide-react";
import { discoverBusinesses } from "@/app/actions/provider-acquisition/discover-businesses";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Same as SAMPLE_ZONES from zone-selector.tsx
const ZONES = {
  "1": { name: "Sydney CBD", state: "NSW", country: "AU" },
  "2": { name: "Melbourne CBD", state: "VIC", country: "AU" },
  "3": { name: "Brisbane CBD", state: "QLD", country: "AU" },
};

interface Business {
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

const DEFAULT_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Construction",
  "Cleaning",
];

interface BusinessDiscoveryProps {
  zoneId: string | null;
  selectedCategories: string[];
  selectedCountry: string;
  zoneName: string;
  categoryLabels: string[];
  onBusinessSelect: (businesses: Business[]) => void;
}

export function BusinessDiscovery({
  zoneId,
  selectedCategories,
  selectedCountry,
  zoneName,
  categoryLabels,
  onBusinessSelect,
}: BusinessDiscoveryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState<Set<string>>(
    new Set()
  );

  const handleDiscover = async () => {
    if (!zoneName) {
      setError("No zone selected");
      return;
    }

    if (categoryLabels.length === 0) {
      setError("Please select at least one category");
      return;
    }

    setIsLoading(true);
    setError(null);
    console.log("🔍 Starting business discovery for zone:", zoneName);

    try {
      const result = await discoverBusinesses({
        zone: zoneName,
        categories: categoryLabels,
        country: selectedCountry,
      });

      console.log("📊 Discovery results:", result);

      if (result.success && Array.isArray(result.data)) {
        const validBusinesses = result.data.filter(
          (business): business is Business => {
            const isValid =
              typeof business.name === "string" &&
              typeof business.description === "string" &&
              typeof business.relevanceScore === "number" &&
              typeof business.category === "string" &&
              categoryLabels.some((cat) =>
                business.category.toLowerCase().includes(cat.toLowerCase())
              );

            if (!isValid) {
              console.log(
                "⚠️ Invalid business data or wrong category:",
                business
              );
            }
            return isValid;
          }
        );
        console.log("✅ Valid businesses found:", validBusinesses.length);
        setBusinesses(validBusinesses);
      } else {
        setError(result.error || "Failed to discover businesses");
      }
    } catch (error) {
      console.error("💥 Error discovering businesses:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-start discovery when zone is selected
  useEffect(() => {
    if (zoneName && categoryLabels.length > 0 && businesses.length === 0) {
      handleDiscover();
    }
  }, [zoneName, categoryLabels]);

  const toggleBusinessSelection = (business: Business) => {
    console.log(`🔄 Toggling selection for: ${business.name}`);
    const newSelected = new Set(selectedBusinesses);
    if (newSelected.has(business.name)) {
      newSelected.delete(business.name);
    } else {
      newSelected.add(business.name);
    }
    setSelectedBusinesses(newSelected);

    // Pass complete business data for selected businesses
    const selectedBusinessData = businesses.filter((b) =>
      newSelected.has(b.name)
    );
    onBusinessSelect(selectedBusinessData);
  };

  if (!zoneName) {
    return (
      <Alert>
        <AlertDescription>
          Please select a zone to start discovering businesses.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Target Zone</span>
          <Badge variant="secondary">
            {zoneName}, {selectedCountry}
          </Badge>
        </div>
        <Button
          onClick={handleDiscover}
          disabled={isLoading}
          className="w-full"
          variant={businesses.length > 0 ? "outline" : "default"}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Discovering...
            </>
          ) : businesses.length > 0 ? (
            <>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Results
            </>
          ) : (
            "Discover Businesses"
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {businesses.length > 0 && (
        <Card className="p-0">
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow key={business.name}>
                    <TableCell>
                      <Checkbox
                        checked={selectedBusinesses.has(business.name)}
                        onCheckedChange={() =>
                          toggleBusinessSelection(business)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>
                          <div className="font-medium">{business.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {business.description}
                          </div>
                        </div>
                        <div className="flex gap-2 text-sm">
                          {business.website && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={business.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-700 inline-flex items-center"
                                  >
                                    <Globe className="h-4 w-4" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{business.website}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {business.email && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={`mailto:${business.email}`}
                                    className="text-blue-500 hover:text-blue-700 inline-flex items-center"
                                  >
                                    <Mail className="h-4 w-4" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{business.email}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {business.phone && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={`tel:${business.phone}`}
                                    className="text-blue-500 hover:text-blue-700 inline-flex items-center"
                                  >
                                    <Phone className="h-4 w-4" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{business.phone}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        {(business.yearsFounded || business.employeeCount) && (
                          <div className="flex gap-2">
                            {business.yearsFounded && (
                              <Badge variant="outline">
                                Est. {business.yearsFounded}
                              </Badge>
                            )}
                            {business.employeeCount && (
                              <Badge variant="outline">
                                {business.employeeCount} employees
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{business.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant={
                                business.relevanceScore > 75
                                  ? "default"
                                  : business.relevanceScore > 50
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {business.relevanceScore}%
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="font-medium">Score Breakdown:</p>
                              <ul className="text-sm">
                                <li>Business Size & Reputation: 30%</li>
                                <li>Online Presence: 20%</li>
                                <li>Service Coverage: 20%</li>
                                <li>Industry Demand: 20%</li>
                                <li>Growth Potential: 10%</li>
                              </ul>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
}
