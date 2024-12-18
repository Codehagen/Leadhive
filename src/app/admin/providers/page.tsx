import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SetupStatusMessage } from "@/components/providers/setup-status-message";
import { getProviders } from "@/app/actions/provider/get-providers";
import { ProvidersClient } from "@/components/providers/providers-client";
import { Suspense } from "react";
import { ProvidersTableSkeleton } from "@/components/providers/tables/skeleton";
import ProviderRegistrationSheet from "@/components/providers/provider-registration-sheet";

export default async function ProvidersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <SetupStatusMessage />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Hey {user?.name?.split(" ")[0]}, Welcome back 👋
        </h2>
        <div className="flex items-center space-x-2">
          <ProviderRegistrationSheet
            trigger={
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Register Provider
              </Button>
            }
          />
        </div>
      </div>

      <Suspense fallback={<ProvidersTableSkeleton />}>
        <ProvidersContent />
      </Suspense>
    </div>
  );
}

async function ProvidersContent() {
  const providersResponse = await getProviders();
  if (!providersResponse.success) {
    throw new Error(providersResponse.error);
  }

  return <ProvidersClient data={providersResponse.data} />;
}
