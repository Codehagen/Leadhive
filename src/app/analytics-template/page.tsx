"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/analytics/tabs/overview-tab";
import { LeadAnalyticsTab } from "@/components/analytics/tabs/lead-analytics-tab";
import { ProviderAnalyticsTab } from "@/components/analytics/tabs/provider-analytics-tab";
import { FinancialAnalyticsTab } from "@/components/analytics/tabs/financial-analytics-tab";
import { GeographicAnalyticsTab } from "@/components/analytics/tabs/geographic-analytics-tab";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
          <TabsTrigger value="providers">Provider Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="leads" className="space-y-4">
          <LeadAnalyticsTab />
        </TabsContent>
        <TabsContent value="providers" className="space-y-4">
          <ProviderAnalyticsTab />
        </TabsContent>
        <TabsContent value="financial" className="space-y-4">
          <FinancialAnalyticsTab />
        </TabsContent>
        <TabsContent value="geographic" className="space-y-4">
          <GeographicAnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
