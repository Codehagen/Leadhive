"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { OverviewCardsSkeleton } from "./overview-cards-skeleton";
import { DashboardChartsSkeleton } from "./dashboard-charts-skeleton";
import { RecentActivitySkeleton } from "./recent-activity-skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[290px]" />
        </div>
      </div>

      <OverviewCardsSkeleton />
      <DashboardChartsSkeleton />
      <RecentActivitySkeleton />
    </div>
  );
}
