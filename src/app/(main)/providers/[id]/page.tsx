import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { redirect } from "next/navigation";
import { getProviderDetails } from "@/app/actions/provider/get-provider-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderDetailsCard } from "@/components/providers/provider-details-card";
import { DashboardTab } from "@/components/providers/tabs/dashboard-tab";
import { ZonesTab } from "@/components/providers/tabs/zones-tab";
import {
  LayoutDashboard,
  MapPin,
  Receipt,
  Users,
  FileText,
  Settings,
} from "lucide-react";

export default async function ProviderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const providerResponse = await getProviderDetails(params.id);
  if (!providerResponse.success) {
    throw new Error(providerResponse.error);
  }

  const provider = providerResponse.data;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProviderDetailsCard provider={provider} />
        </div>
        <div className="md:col-span-2">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="zones" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Zones</span>
              </TabsTrigger>
              <TabsTrigger value="leads" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Leads</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                <span>Payments</span>
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <DashboardTab provider={provider} />
            </TabsContent>

            <TabsContent value="zones">
              <ZonesTab provider={provider} />
            </TabsContent>

            <TabsContent value="leads">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track and manage customer leads
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View payment history and invoices
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manage contracts and important documents
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Configure provider settings and preferences
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
