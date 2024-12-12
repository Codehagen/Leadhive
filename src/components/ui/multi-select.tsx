"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
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
import { Badge } from "@/components/ui/badge";
import { getCategories } from "@/app/actions/category/get-categories";

export interface Option {
  value: string;
  label: string;
  description?: string;
}

interface MultiSelectProps {
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  selected,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadCategories() {
      const result = await getCategories();
      if (result.success) {
        setOptions(result.data);
      }
      setLoading(false);
    }

    loadCategories();
  }, []);

  const selectedItems = options.filter((option) =>
    selected.includes(option.value)
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1">
        {selectedItems.map((item) => (
          <Badge
            key={item.value}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {item.label}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => {
                onChange(selected.filter((value) => value !== item.value));
              }}
            />
          </Badge>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between", className)}
            disabled={loading}
          >
            {loading ? (
              "Loading categories..."
            ) : (
              <>
                {selectedItems.length === 0
                  ? placeholder
                  : `${selectedItems.length} selected`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(
                        selected.includes(currentValue)
                          ? selected.filter((value) => value !== currentValue)
                          : [...selected, currentValue]
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
