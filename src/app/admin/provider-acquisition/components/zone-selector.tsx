"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getCategories } from "@/app/actions/category/get-categories";
import { getCountries } from "@/app/actions/country/get-countries";
import { getZonesByCountry } from "@/app/actions/zone/get-zones-by-country";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ZoneSelectorProps {
  onZoneSelect: (
    zoneId: string,
    country: string,
    name: string,
    countryId: string
  ) => void;
  onCategoriesChange: (categories: { value: string; label: string }[]) => void;
  selectedCategories: string[];
}

interface Category {
  value: string;
  label: string;
  description?: string;
}

interface Country {
  code: string;
  name: string;
  id: string;
}

interface Zone {
  id: string;
  name: string;
  state?: string;
}

export function ZoneSelector({
  onZoneSelect,
  onCategoriesChange,
  selectedCategories,
}: ZoneSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedZoneId, setSelectedZoneId] = useState<string>("");
  const [zones, setZones] = useState<Zone[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoadingZones, setIsLoadingZones] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data (categories and countries)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesResult, countriesResult] = await Promise.all([
          getCategories(),
          getCountries(),
        ]);

        if (categoriesResult.success) {
          setCategories(categoriesResult.data);
        } else {
          console.error("Failed to fetch categories:", categoriesResult.error);
        }

        if (countriesResult.success) {
          setCountries(countriesResult.data);
        } else {
          console.error("Failed to fetch countries:", countriesResult.error);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to load initial data");
      } finally {
        setIsLoadingInitial(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch zones when country is selected
  useEffect(() => {
    const fetchZones = async () => {
      if (!selectedCountry) {
        setZones([]);
        return;
      }

      setIsLoadingZones(true);
      setError(null);
      try {
        const result = await getZonesByCountry(selectedCountry);
        if (result.success) {
          console.log(
            `📍 Loaded ${result.data.length} zones for ${selectedCountry}`
          );
          setZones(result.data);
        } else {
          setError("Failed to load zones");
          setZones([]);
        }
      } catch (error) {
        console.error("Error fetching zones:", error);
        setError("Failed to load zones");
        setZones([]);
      } finally {
        setIsLoadingZones(false);
      }
    };

    fetchZones();
  }, [selectedCountry]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedZoneId(""); // Reset zone selection when country changes
  };

  const handleSearch = () => {
    if (selectedZoneId && selectedCategories.length > 0) {
      const selectedZone = zones.find((z) => z.id === selectedZoneId);
      const country = countries.find((c) => c.code === selectedCountry);

      if (selectedZone && country) {
        console.log("🔍 Starting search with:", {
          zoneId: selectedZoneId,
          categories: selectedCategories,
          country: country.name,
          zoneName: selectedZone.name,
          countryId: country.id,
        });
        onZoneSelect(
          selectedZoneId,
          country.name,
          selectedZone.name,
          country.id
        );
      }
    }
  };

  const handleCategoryClick = (category: Category) => {
    if (selectedCategories.includes(category.value)) {
      // Remove the category
      const remainingIds = selectedCategories.filter(
        (id) => id !== category.value
      );
      onCategoriesChange(
        categories.filter((c) => remainingIds.includes(c.value))
      );
    } else {
      // Add the category
      const newIds = [...selectedCategories, category.value];
      onCategoriesChange(categories.filter((c) => newIds.includes(c.value)));
    }
  };

  if (isLoadingInitial) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* Country Selection */}
      <div>
        <label className="text-sm font-medium mb-2 block">Country</label>
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center justify-between w-full">
                  <span>{country.name}</span>
                  <Badge variant="outline">{country.code}</Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Zone Selection */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Zone {zones.length > 0 && `(${zones.length} available)`}
        </label>
        <Select
          value={selectedZoneId}
          onValueChange={setSelectedZoneId}
          disabled={!selectedCountry || isLoadingZones}
        >
          <SelectTrigger>
            {isLoadingZones ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading zones...
              </div>
            ) : (
              <SelectValue
                placeholder={
                  zones.length > 0 ? "Select zone" : "No zones available"
                }
              />
            )}
          </SelectTrigger>
          <SelectContent>
            {zones.map((zone) => (
              <SelectItem key={zone.id} value={zone.id}>
                <div className="flex items-center justify-between w-full">
                  <span>
                    {zone.name}
                    {zone.state && (
                      <span className="text-muted-foreground ml-2">
                        {zone.state}
                      </span>
                    )}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Selection */}
      <div>
        <label className="text-sm font-medium mb-2 block">Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.value}
              variant={
                selectedCategories.includes(category.value)
                  ? "default"
                  : "outline"
              }
              className="cursor-pointer hover:bg-primary/10"
              title={category.description}
              onClick={() => handleCategoryClick(category)}
            >
              {category.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Summary and Search Button */}
      {(selectedCountry || selectedZoneId || selectedCategories.length > 0) && (
        <Card className="p-4 mt-4">
          <div className="space-y-2">
            {selectedCountry && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Country</span>
                <Badge variant="secondary">
                  {countries.find((c) => c.code === selectedCountry)?.name}
                </Badge>
              </div>
            )}
            {selectedZoneId && zones.length > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Zone</span>
                <Badge variant="secondary">
                  {zones.find((z) => z.id === selectedZoneId)?.name}
                </Badge>
              </div>
            )}
            {selectedCategories.length > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Categories
                </span>
                <div className="flex gap-1">
                  {selectedCategories.map((categoryId) => {
                    const category = categories.find(
                      (c) => c.value === categoryId
                    );
                    return (
                      <Badge key={categoryId} variant="outline">
                        {category?.label || categoryId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <Button
            className="w-full mt-4"
            disabled={!selectedZoneId || selectedCategories.length === 0}
            onClick={handleSearch}
          >
            Find Businesses
          </Button>
        </Card>
      )}
    </div>
  );
}
