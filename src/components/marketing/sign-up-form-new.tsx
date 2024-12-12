"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLeadRequest } from "@/app/actions/lead/create-contact-request";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Icons } from "../icons";
import confetti from "canvas-confetti";

// Validation functions
function validateNorwegianPhone(phone: string): boolean {
  const phoneRegex = /^(\+47|0047)?[2-9]\d{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateNorwegianPostalCode(postalCode: string): boolean {
  return /^\d{4}$/.test(postalCode);
}

export function SignUpFormTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    serviceDetails: "",
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

  // Form validation
  function validateForm() {
    if (!formData.name.trim()) {
      toast.error("Navn er påkrevd");
      return false;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Vennligst oppgi en gyldig e-postadresse");
      return false;
    }

    if (!validateNorwegianPhone(formData.phone)) {
      toast.error("Vennligst oppgi et gyldig norsk telefonnummer");
      return false;
    }

    if (!validateNorwegianPostalCode(formData.postalCode)) {
      toast.error("Vennligst oppgi et gyldig postnummer");
      return false;
    }

    if (!formData.serviceDetails.trim()) {
      toast.error("Vennligst fortell oss hva vi kan hjelpe deg med");
      return false;
    }

    return true;
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      const response = await createLeadRequest(formData);

      if (response.success) {
        setIsSubmitted(true);
        toast.success("Takk for din henvendelse! Vi tar kontakt snart.");
        triggerConfetti();
      } else {
        toast.error(response.error || "Noe gikk galt. Vennligst prøv igjen.");
      }
    } catch (error) {
      toast.error("En feil oppstod. Vennligst prøv igjen senere.");
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
            Takk for din henvendelse!
          </h3>
          <p className="text-muted-foreground mb-4">
            Vi har mottatt din forespørsel og vil ta kontakt med deg innen kort
            tid.
          </p>
          <p className="text-sm text-muted-foreground">
            Har du spørsmål i mellomtiden?{" "}
            <Link
              href="/kundeservice"
              className="text-primary underline-offset-4 hover:underline"
            >
              Kontakt oss
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact Information */}
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Fullt navn</Label>
            <Input
              id="full-name"
              placeholder="Ola Nordmann"
              required
              disabled={isLoading}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              placeholder="ola@example.no"
              type="email"
              required
              disabled={isLoading}
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
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
            <Label htmlFor="postal-code">Postnummer</Label>
            <Input
              id="postal-code"
              placeholder="0000"
              maxLength={4}
              required
              disabled={isLoading}
              value={formData.postalCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, postalCode: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-details">Hva kan vi hjelpe deg med?</Label>
            <Textarea
              id="service-details"
              placeholder="Fortell oss om ditt prosjekt..."
              required
              disabled={isLoading}
              value={formData.serviceDetails}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  serviceDetails: e.target.value,
                }))
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
            Jeg godtar{" "}
            <Link
              href="/terms"
              className="text-primary underline-offset-4 hover:underline"
            >
              vilkårene
            </Link>{" "}
            og{" "}
            <Link
              href="/personvern"
              className="text-primary underline-offset-4 hover:underline"
            >
              personvernerklæringen
            </Link>
          </label>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={!agreed || isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Send forespørsel
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Allerede kunde?{" "}
        <Link
          href="/login"
          className="text-primary underline-offset-4 hover:underline"
        >
          Logg inn
        </Link>
      </p>
    </div>
  );
}
