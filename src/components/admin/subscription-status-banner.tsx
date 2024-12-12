"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/subscription-plans";
import { UpdateSubscriptionPriceDialog } from "./update-subscription-price-dialog";

interface SubscriptionStatusBannerProps {
  subscription: {
    id: string;
    workspaceId: string;
    plan: {
      id: string;
      name: string;
      monthlyPrice: number;
      yearlyMonthlyPrice: number;
    };
    isYearly: boolean;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    customMonthlyPrice?: number | null;
  };
  onCancelSubscription: () => Promise<void>;
  onReactivateSubscription: () => Promise<void>;
  onUpdateBillingCycle: (isYearly: boolean) => Promise<void>;
  isLoading: boolean;
}

export function SubscriptionStatusBanner({
  subscription,
  onCancelSubscription,
  onReactivateSubscription,
  onUpdateBillingCycle,
  isLoading,
}: SubscriptionStatusBannerProps) {
  const handleCancel = async () => {
    try {
      await onCancelSubscription();
    } catch (error) {
      console.error("Error in subscription banner:", error);
    }
  };

  const handleBillingCycleChange = async (checked: boolean) => {
    try {
      await onUpdateBillingCycle(checked);
    } catch (error) {
      console.error("Error updating billing cycle:", error);
      toast.error("Kunne ikke oppdatere faktureringssyklus");
    }
  };

  const currentPrice = subscription.isYearly
    ? subscription.plan.yearlyMonthlyPrice
    : subscription.plan.monthlyPrice;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between space-x-6">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {subscription.cancelAtPeriodEnd ? (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            )}
            <h3 className="font-semibold">
              {subscription.cancelAtPeriodEnd
                ? "Abonnement avsluttes"
                : "Aktivt abonnement"}
            </h3>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            <p>Nåværende plan: {subscription.plan.name}</p>
            <p>Fakturering: {subscription.isYearly ? "Årlig" : "Månedlig"}</p>
            <p>Pris per måned: {currentPrice}</p>
            <p>
              {subscription.cancelAtPeriodEnd ? "Avsluttes" : "Neste faktura"}:{" "}
              {format(new Date(subscription.currentPeriodEnd), "d.M.yyyy", {
                locale: nb,
              })}
            </p>
            {subscription.cancelAtPeriodEnd && (
              <p className="mt-2 text-yellow-500">
                Abonnementet vil bli avsluttet ved periodens slutt
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="yearly-billing"
              checked={subscription.isYearly}
              onCheckedChange={handleBillingCycleChange}
              disabled={isLoading}
            />
            <Label htmlFor="yearly-billing" className="ml-2">
              Årlig fakturering (2 måneder gratis)
            </Label>
            <UpdateSubscriptionPriceDialog subscription={subscription} />
          </div>
          {subscription.cancelAtPeriodEnd ? (
            <Button
              variant="outline"
              size="sm"
              className="text-primary"
              onClick={onReactivateSubscription}
              disabled={isLoading}
            >
              {isLoading ? "Reaktiverer..." : "Reaktiver abonnement"}
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                >
                  Avslutt abonnement
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Dette vil avslutte abonnementet ved slutten av inneværende
                    periode (
                    {format(
                      new Date(subscription.currentPeriodEnd),
                      "d. MMMM yyyy",
                      {
                        locale: nb,
                      }
                    )}
                    ). Bedriften vil ikke lenger ha tilgang til tjenesten etter
                    denne datoen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Avbryt</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isLoading ? "Avslutter..." : "Avslutt abonnement"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
