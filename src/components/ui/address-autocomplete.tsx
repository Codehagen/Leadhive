"use client";

import * as React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Command } from "cmdk";
import {
  Command as CommandPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const libraries: "places"[] = ["places"];

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    fullAddress: string;
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function AddressAutocomplete({
  onAddressSelect,
  placeholder = "Search for an address...",
  className,
  disabled = false,
}: AddressAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [predictions, setPredictions] = React.useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const autocompleteService =
    React.useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = React.useRef<google.maps.places.PlacesService | null>(
    null
  );

  React.useEffect(() => {
    if (isLoaded && !autocompleteService.current) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
      // Create a dummy div for PlacesService (required but not used)
      const dummyElement = document.createElement("div");
      placesService.current = new google.maps.places.PlacesService(
        dummyElement
      );
    }
  }, [isLoaded]);

  const getPlaceDetails = React.useCallback(async (placeId: string) => {
    return new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      if (!placesService.current)
        return reject("Places service not initialized");

      placesService.current.getDetails(
        {
          placeId,
          fields: ["address_components", "formatted_address"],
        },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            resolve(result);
          } else {
            reject(status);
          }
        }
      );
    });
  }, []);

  const handleInputChange = React.useCallback(async (value: string) => {
    setInputValue(value);
    if (!value || !autocompleteService.current) return;

    setIsLoading(true);
    try {
      const results = await autocompleteService.current.getPlacePredictions({
        input: value,
        componentRestrictions: { country: "au" },
        types: ["address"],
      });
      setPredictions(results?.predictions || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelect = React.useCallback(
    async (placeId: string) => {
      try {
        const details = await getPlaceDetails(placeId);
        if (!details.address_components) return;

        const addressComponents = details.address_components;
        const addressData = {
          fullAddress: details.formatted_address || "",
          streetAddress: [
            addressComponents.find((c) => c.types.includes("street_number"))
              ?.long_name,
            addressComponents.find((c) => c.types.includes("route"))?.long_name,
          ]
            .filter(Boolean)
            .join(" "),
          suburb:
            addressComponents.find((c) => c.types.includes("locality"))
              ?.long_name || "",
          state:
            addressComponents.find((c) =>
              c.types.includes("administrative_area_level_1")
            )?.short_name || "",
          postcode:
            addressComponents.find((c) => c.types.includes("postal_code"))
              ?.long_name || "",
          country:
            addressComponents.find((c) => c.types.includes("country"))
              ?.long_name || "",
        };

        onAddressSelect(addressData);
        setInputValue(addressData.fullAddress);
        setOpen(false);
      } catch (error) {
        console.error("Error getting place details:", error);
      }
    },
    [getPlaceDetails, onAddressSelect]
  );

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return (
      <Button
        variant="outline"
        className={cn("w-full justify-between", className)}
        disabled
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between", className)}
        >
          {inputValue || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <CommandPrimitive>
          <CommandInput
            placeholder="Type to search..."
            value={inputValue}
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Searching..." : "No addresses found."}
            </CommandEmpty>
            <CommandGroup>
              {predictions.map((prediction) => (
                <CommandItem
                  key={prediction.place_id}
                  value={prediction.place_id}
                  onSelect={handleSelect}
                >
                  {prediction.description}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandPrimitive>
      </PopoverContent>
    </Popover>
  );
}
