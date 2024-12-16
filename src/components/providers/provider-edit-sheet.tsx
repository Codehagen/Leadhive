"use client";

import { useState } from "react";
import { Provider } from "@prisma/client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { updateProviderDetails } from "@/app/actions/provider/update-provider-details";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const providerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  orgnr: z.string().min(1, "Organization number is required"),
  address: z.string().min(1, "Address is required"),
  zip: z.string().min(1, "ZIP code is required"),
  city: z.string().min(1, "City is required"),
  maxUsers: z.coerce.number().min(1, "Must have at least 1 user"),
  industry: z.string().optional(),
  contactEmail: z.string().email("Invalid email address"),
  contactName: z.string().min(1, "Contact name is required"),
  status: z.enum(["ACTIVE", "PENDING_ONBOARDING", "INACTIVE"]),
});

type ProviderFormValues = z.infer<typeof providerFormSchema>;

interface ProviderEditSheetProps {
  provider: Provider;
}

export function ProviderEditSheet({ provider }: ProviderEditSheetProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      name: provider.name,
      orgnr: provider.orgnr || "",
      address: provider.address || "",
      zip: provider.zip || "",
      city: provider.city || "",
      maxUsers: provider.maxUsers,
      industry: provider.industry || "",
      contactEmail: provider.contactEmail || "",
      contactName: provider.contactName || "",
      status: provider.status as "PENDING_ONBOARDING" | "ACTIVE" | "INACTIVE",
    },
  });

  async function onSubmit(data: ProviderFormValues) {
    try {
      setIsSubmitting(true);

      console.log("=== Provider Update Submission ===");
      console.log("Provider ID:", provider.id);
      console.log("Current Provider Data:", provider);
      console.log("Form Data:", data);
      console.log("Combined Update Data:", {
        id: provider.id,
        ...data,
      });

      const response = await updateProviderDetails({
        id: provider.id,
        ...data,
      });

      console.log("Server Response:", response);

      if (response.success) {
        toast.success("Provider details updated successfully");
        setOpen(false);
      } else {
        console.error("Update failed:", response.error);
        toast.error(response.error || "Failed to update provider");
      }
    } catch (error) {
      console.error("Error during update:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      toast.error("An error occurred while updating provider");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4">
          <Pencil className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Provider Details</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
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
                  name="maxUsers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Users</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
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
                </div>
              </div>

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="PENDING_ONBOARDING">
                          Pending Onboarding
                        </SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
