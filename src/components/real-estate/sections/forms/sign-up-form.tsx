"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Check } from "lucide-react";
import { createContactRequest } from "@/app/actions/lead/create-contact-request";
import { findZoneByPostalCode } from "@/app/actions/zone/find-zone";
import { getCategories } from "@/app/actions/category/get-categories";
import confetti from "canvas-confetti";

// Australian phone number validation
function validatePhone(phone: string): boolean {
  const phoneRegex = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Australian postcode validation
function validateAustralianPostcode(postcode: string): boolean {
  return /^\d{4}$/.test(postcode);
}

export function SignUpFormRealEstateAU() {
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [zoneName, setZoneName] = useState<string | null>(null);
  const [realEstateCategoryId, setRealEstateCategoryId] = useState<
    string | null
  >(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    postcode: "", // Changed from zipCode to postcode
    message: "",
  });

  // Fetch real estate category ID on component mount
  useEffect(() => {
    async function fetchRealEstateCategory() {
      try {
        const categoriesResult = await getCategories();
        if (categoriesResult.success) {
          const realEstateCategory = categoriesResult.data.find(
            (category) => category.label === "Real Estate"
          );
          if (realEstateCategory) {
            setRealEstateCategoryId(realEstateCategory.value);
          }
        }
      } catch (error) {
        console.error("Error fetching real estate category:", error);
      }
    }
    fetchRealEstateCategory();
  }, []);

  // Handle postcode change and validate zone
  const handlePostcodeChange = async (postcode: string) => {
    setFormData((prev) => ({ ...prev, postcode }));
    setZoneName(null); // Reset zone name when postcode changes

    if (postcode.length === 4) {
      const zoneResult = await findZoneByPostalCode(postcode, {
        country: "AU",
      });
      if (!zoneResult.success || !zoneResult.data) {
        toast.error("Sorry, we don't currently service this area");
      } else {
        setZoneName(zoneResult.data.name);
      }
    }
  };

  // Form validation
  function validateForm() {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid Australian phone number");
      return false;
    }

    if (!formData.address.trim()) {
      toast.error("Property address is required");
      return false;
    }

    if (!validateAustralianPostcode(formData.postcode)) {
      toast.error("Please enter a valid Australian postcode");
      return false;
    }

    return true;
  }

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      if (!realEstateCategoryId) {
        toast.error("Unable to process real estate requests at this time");
        return;
      }

      // Verify zone exists before submitting
      const zoneResult = await findZoneByPostalCode(formData.postcode, {
        country: "AU",
      });
      if (!zoneResult.success || !zoneResult.data) {
        toast.error("Sorry, we don't currently service this area");
        setIsLoading(false);
        return;
      }

      const response = await createContactRequest({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        address: formData.address,
        postalCode: formData.postcode,
        categoryIds: [realEstateCategoryId],
        country: "AU",
      });

      if (response.success) {
        setIsSubmitted(true);
        toast.success("Thank you! We'll connect you with local agents soon.");
        triggerConfetti();
      } else {
        toast.error(
          response.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="p-6 rounded-lg border bg-background/60 backdrop-blur-xl">
          <div className="mb-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mx-auto flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Thanks for your enquiry!
          </h3>
          <p className="text-muted-foreground mb-4">
            We'll connect you with top local agents within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <Link
              href="/contact"
              className="text-primary underline-offset-4 hover:underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              placeholder="John Smith"
              required
              disabled={isLoading}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="0400 000 000"
              type="tel"
              required
              disabled={isLoading}
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              required
              disabled={isLoading}
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              placeholder="2000"
              maxLength={4}
              required
              disabled={isLoading}
              value={formData.postcode}
              onChange={(e) => handlePostcodeChange(e.target.value)}
            />
            {zoneName ? (
              <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-md">
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Service area found: {zoneName}
                </p>
              </div>
            ) : (
              formData.postcode.length === 4 && (
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-md">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Checking service availability...
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            disabled={isLoading}
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-primary underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={!agreed || isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Get matched with agents
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Connect with top real estate agents in your area
      </p>
    </div>
  );
}
