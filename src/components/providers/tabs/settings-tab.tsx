"use client";

import { Provider } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setupProviderPayment } from "@/app/actions/stripe/setup-provider-payment";
import { toast } from "sonner";
import { CreditCard, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SettingsTabProps {
  provider: Provider & {
    paymentInfo?: {
      accountId: string;
      accountStatus: string;
      hasPaymentMethod: boolean;
    } | null;
  };
}

export function SettingsTab({ provider }: SettingsTabProps) {
  const handleStripeSetup = async () => {
    try {
      const result = await setupProviderPayment(provider.id);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        toast.error("Failed to setup payment processing");
      }
    } catch (error) {
      toast.error("An error occurred while setting up payments");
    }
  };

  const needsPaymentSetup = !provider.paymentInfo?.hasPaymentMethod;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your provider settings and payment setup
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Setup
          </CardTitle>
          <CardDescription>
            Configure your payment processing settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Payment Status</p>
              <p className="text-sm text-muted-foreground">
                {provider.paymentInfo?.hasPaymentMethod
                  ? "Your payment method is active"
                  : "Payment method needs to be set up"}
              </p>
            </div>
            <Badge
              variant={
                provider.paymentInfo?.hasPaymentMethod
                  ? "default"
                  : "destructive"
              }
            >
              {provider.paymentInfo?.hasPaymentMethod ? "Active" : "Not Set Up"}
            </Badge>
          </div>

          {needsPaymentSetup && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Action Required</AlertTitle>
              <AlertDescription>
                You need to set up your payment method to receive leads. Click
                the button below to complete the setup process.
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleStripeSetup}
            variant={needsPaymentSetup ? "default" : "default"}
            className="w-full"
          >
            {needsPaymentSetup
              ? "Set Up Payment Method"
              : "Update Payment Settings"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Provider Information</CardTitle>
          <CardDescription>
            Your business details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Business Name</p>
                <p className="text-sm text-muted-foreground">{provider.name}</p>
              </div>
              <div>
                <p className="font-medium">Organization Number</p>
                <p className="text-sm text-muted-foreground">
                  {provider.orgnr}
                </p>
              </div>
              <div>
                <p className="font-medium">Contact Name</p>
                <p className="text-sm text-muted-foreground">
                  {provider.contactName}
                </p>
              </div>
              <div>
                <p className="font-medium">Contact Email</p>
                <p className="text-sm text-muted-foreground">
                  {provider.contactEmail}
                </p>
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  {provider.address}
                  <br />
                  {provider.city}, {provider.zip}
                </p>
              </div>
              <div>
                <p className="font-medium">Industry</p>
                <p className="text-sm text-muted-foreground">
                  {provider.industry || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
