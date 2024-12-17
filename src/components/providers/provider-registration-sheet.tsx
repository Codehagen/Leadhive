"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createProvider } from "@/app/actions/provider/create-provider";
import { MultiSelect } from "../ui/multi-select";
import { findZoneByPostalCode } from "@/app/actions/zone/find-zone";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  orgnr: z.string().min(9, "Organization number must be at least 9 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zip: z.string().min(4, "ZIP code must be at least 4 characters"),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  contactEmail: z.string().email("Please enter a valid email address"),
  country: z.string().min(2, "Please select a country"),
});

type FormData = z.infer<typeof formSchema>;

const countries = [
  { code: "AU", name: "Australia" },
  { code: "NO", name: "Norway" },
];

export default function ProviderRegistrationSheet({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isCheckingZone, setIsCheckingZone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zoneInfo, setZoneInfo] = useState<{
    id: string;
    name: string;
    city?: string;
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      orgnr: "",
      address: "",
      city: "",
      zip: "",
      categoryIds: [],
      contactName: "",
      contactEmail: "",
      country: "",
    },
  });

  // Check zone when ZIP code or country changes
  const handleZipChange = async (zip: string) => {
    const country = form.getValues("country");
    if (zip.length >= 4 && country) {
      setIsCheckingZone(true);
      try {
        const result = await findZoneByPostalCode(zip, { country });
        if (result.success && result.data) {
          setZoneInfo(result.data);
          if (result.data.city) {
            form.setValue("city", result.data.city);
          }
        } else {
          setZoneInfo(null);
          toast.error("No service zone found for this postal code");
        }
      } catch (error) {
        console.error("Error checking zone:", error);
        toast.error("Error checking service zone");
      } finally {
        setIsCheckingZone(false);
      }
    } else {
      setZoneInfo(null);
    }
  };

  async function onSubmit(values: FormData) {
    if (!zoneInfo) {
      toast.error("Please enter a valid postal code to determine service zone");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createProvider({
        ...values,
        zoneIds: [zoneInfo.id],
      });

      if (result.success) {
        toast.success(
          "Provider registered successfully. Check your email for payment setup instructions."
        );
        setOpen(false);
      } else {
        toast.error(result.error || "Failed to register provider");
      }
    } catch (error) {
      console.error("Error registering provider:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Register New Provider</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <div className="space-y-4">
              <h3 className="font-medium">Company Details</h3>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const zip = form.getValues("zip");
                          if (zip) handleZipChange(zip);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your Company Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orgnr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123456789" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            {...field}
                            placeholder="1234"
                            onChange={(e) => {
                              field.onChange(e);
                              handleZipChange(e.target.value);
                            }}
                          />
                          {isCheckingZone && (
                            <p className="text-sm text-muted-foreground">
                              Checking service zone...
                            </p>
                          )}
                          {zoneInfo && (
                            <p className="text-sm text-green-600">
                              Service zone: {zoneInfo.name}
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Business Street" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Categories</FormLabel>
                      <FormControl>
                        <MultiSelect
                          selected={field.value}
                          onChange={field.onChange}
                          placeholder="Select categories"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Contact Person</h3>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Smith" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john.smith@company.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!zoneInfo || isCheckingZone || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register Provider"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
