import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProviderRegistrationDialog from "@/components/providers/provider-registration-dialog";
import { SetupStatusMessage } from "@/components/providers/setup-status-message";

export default async function ProvidersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  try {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <SetupStatusMessage />
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hey {user?.name?.split(" ")[0]}, Welcome back 👋
          </h2>
          <div className="flex items-center space-x-2">
            <ProviderRegistrationDialog
              trigger={
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Register Provider
                </Button>
              }
            />
          </div>
        </div>

        {/* Provider list will go here */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>

        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="text-center text-red-500">
          Error loading provider registration. Please try again later.
        </div>
      </div>
    );
  }
}
