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

// Norwegian phone number validation
function validatePhone(phone: string): boolean {
  const phoneRegex = /^(?:\+47|0)?[4-9]\d{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Norwegian postal code validation
function validateNorwegianPostalCode(postalCode: string): boolean {
  return /^\d{4}$/.test(postalCode);
}

export function SignUpFormRealEstateNO() {
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
    postalCode: "",
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

  // Handle postal code change and validate zone
  const handlePostalCodeChange = async (postalCode: string) => {
    setFormData((prev) => ({ ...prev, postalCode }));
    setZoneName(null); // Reset zone name when postal code changes

    if (postalCode.length === 4) {
      const zoneResult = await findZoneByPostalCode(postalCode, {
        country: "NO",
      });
      if (!zoneResult.success || !zoneResult.data) {
        toast.error("Beklager, vi betjener ikke dette området ennå");
      } else {
        setZoneName(zoneResult.data.name);
      }
    }
  };

  // Form validation
  function validateForm() {
    if (!formData.name.trim()) {
      toast.error("Navn er påkrevd");
      return false;
    }

    if (!validatePhone(formData.phone)) {
      toast.error("Vennligst oppgi et gyldig norsk telefonnummer");
      return false;
    }

    if (!formData.address.trim()) {
      toast.error("Adresse er påkrevd");
      return false;
    }

    if (!validateNorwegianPostalCode(formData.postalCode)) {
      toast.error("Vennligst oppgi et gyldig postnummer");
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
        toast.error("Kan ikke behandle eiendomsforespørsler akkurat nå");
        return;
      }

      // Verify zone exists before submitting
      const zoneResult = await findZoneByPostalCode(formData.postalCode, {
        country: "NO",
      });
      if (!zoneResult.success || !zoneResult.data) {
        toast.error("Beklager, vi betjener ikke dette området ennå");
        setIsLoading(false);
        return;
      }

      const response = await createContactRequest({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        address: formData.address,
        postalCode: formData.postalCode,
        categoryIds: [realEstateCategoryId],
        country: "NO",
      });

      if (response.success) {
        setIsSubmitted(true);
        toast.success("Takk! Vi kobler deg med lokale meglere snart.");
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
            Vi kobler deg med lokale toppmeglere innen 24 timer.
          </p>
          <p className="text-sm text-muted-foreground">
            Har du spørsmål?{" "}
            <Link
              href="/contact"
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
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Fullt Navn</Label>
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
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              placeholder="98453571"
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
            <Label htmlFor="address">Gateadresse</Label>
            <Input
              id="address"
              placeholder="Storgata 1"
              required
              disabled={isLoading}
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postnummer</Label>
            <Input
              id="postalCode"
              placeholder="0150"
              maxLength={4}
              required
              disabled={isLoading}
              value={formData.postalCode}
              onChange={(e) => handlePostalCodeChange(e.target.value)}
            />
            {zoneName ? (
              <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-md">
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Serviceområde funnet: {zoneName}
                </p>
              </div>
            ) : (
              formData.postalCode.length === 4 && (
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-md">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Sjekker tilgjengelighet...
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
            Jeg godtar{" "}
            <Link
              href="/terms"
              className="text-primary underline-offset-4 hover:underline"
            >
              Vilkårene
            </Link>{" "}
            og{" "}
            <Link
              href="/privacy"
              className="text-primary underline-offset-4 hover:underline"
            >
              Personvernerklæringen
            </Link>
          </label>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={!agreed || isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Bli koblet med meglere
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Kom i kontakt med toppmeglere i ditt område
      </p>
    </div>
  );
}
