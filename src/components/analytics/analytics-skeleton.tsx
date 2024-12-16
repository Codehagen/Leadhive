"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[180px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="border-b">
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-[150px]" />
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="grid gap-4">
        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-7 w-[120px] mb-4" />
              <Skeleton className="h-10 w-[150px]" />
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <Skeleton className="h-[300px]" />
          </Card>
          <Card className="p-6">
            <Skeleton className="h-[300px]" />
          </Card>
        </div>

        {/* Table */}
        <Card className="p-6">
          <Skeleton className="h-8 w-[200px] mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
