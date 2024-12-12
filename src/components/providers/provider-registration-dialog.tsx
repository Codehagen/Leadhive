"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

interface FormData {
  name: string;
  orgnr: string;
  address: string;
  city: string;
  zip: string;
  industry?: string;
  categoryIds: string[];
  contactName: string;
  contactEmail: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  orgnr: z.string().min(9, "Organization number must be at least 9 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zip: z.string().min(4, "ZIP code must be at least 4 characters"),
  industry: z.string().optional(),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  contactEmail: z.string().email("Please enter a valid email address"),
});

export default function ProviderRegistrationDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isCheckingZone, setIsCheckingZone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zoneInfo, setZoneInfo] = useState<{ id: string; name: string } | null>(
    null
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      orgnr: "",
      address: "",
      city: "",
      zip: "",
      industry: "",
      categoryIds: [],
      contactName: "",
      contactEmail: "",
    },
  });

  // Check zone when ZIP code changes
  const handleZipChange = async (zip: string) => {
    if (zip.length >= 4) {
      setIsCheckingZone(true);
      try {
        const result = await findZoneByPostalCode(zip);
        if (result.success && result.data) {
          setZoneInfo(result.data);
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
        toast.success("Provider registered successfully");
        setOpen(false);
        form.reset();
        setZoneInfo(null);
      } else {
        toast.error(result.error || "Failed to register provider");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register New Provider</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Company Details</h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Construction, Real Estate"
                      />
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
                        placeholder="Select your business categories"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Contact Person</h3>
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
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
                        placeholder="john.doe@company.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
      </DialogContent>
    </Dialog>
  );
}
