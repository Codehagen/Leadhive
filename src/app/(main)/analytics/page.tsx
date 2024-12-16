import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Activity, Users, DollarSign, MapPin } from "lucide-react";
import { Suspense } from "react";
import { AnalyticsSkeleton } from "@/components/analytics/analytics-skeleton";
import { OverviewTab } from "@/components/analytics/tabs/overview-tab";
import { LeadAnalyticsTab } from "@/components/analytics/tabs/lead-analytics-tab";
import { ProviderAnalyticsTab } from "@/components/analytics/tabs/provider-analytics-tab";
import { FinancialAnalyticsTab } from "@/components/analytics/tabs/financial-analytics-tab";
import { GeographicAnalyticsTab } from "@/components/analytics/tabs/geographic-analytics-tab";

async function AnalyticsContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Analyze and track your platform's performance
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Lead Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="providers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Provider Performance</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Financial</span>
          </TabsTrigger>
          <TabsTrigger value="geographic" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Geographic</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="leads">
          <LeadAnalyticsTab />
        </TabsContent>

        <TabsContent value="providers">
          <ProviderAnalyticsTab />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialAnalyticsTab />
        </TabsContent>

        <TabsContent value="geographic">
          <GeographicAnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsContent />
    </Suspense>
  );
}
