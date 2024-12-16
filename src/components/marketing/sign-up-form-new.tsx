"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createContactRequest } from "@/app/actions/lead/create-contact-request";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Icons } from "../icons";
import confetti from "canvas-confetti";

// Updated validation functions
function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+47|0047)?[2-9]\d{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

function validateNorwegianPostalCode(postalCode: string): boolean {
  return /^\d{4}$/.test(postalCode);
}

export function SignUpFormTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Updated form state - removed propertyType and timeframe
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    zipCode: "",
    message: "",
  });

  // Add confetti effect function
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

  // Form validation with English messages but Norwegian validation
  function validateForm() {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    if (!formData.address.trim()) {
      toast.error("Property address is required");
      return false;
    }

    if (!validateNorwegianPostalCode(formData.zipCode)) {
      toast.error("Please enter a valid ZIP code");
      return false;
    }

    return true;
  }

  // Updated handleSubmit with Norwegian success message
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      const response = await createContactRequest({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        address: formData.address,
        postalCode: formData.zipCode,
        categoryIds: [],
      });

      if (response.success) {
        setIsSubmitted(true);
        toast.success(
          "Thank you! We'll be in touch with agent proposals soon."
        );
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

  // Updated success message in Norwegian
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
            Thanks for your submission!
          </h3>
          <p className="text-muted-foreground mb-4">
            We've received your request and will send you agent proposals within
            24 hours.
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

  // Updated form labels and placeholders to Norwegian
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
              placeholder="999 99 999"
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
              placeholder="123 Main St"
              required
              disabled={isLoading}
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip-code">ZIP Code</Label>
            <Input
              id="zip-code"
              placeholder="0000"
              maxLength={4}
              required
              disabled={isLoading}
              value={formData.zipCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
              }
            />
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
        Find your perfect real estate agent
      </p>
    </div>
  );
}
