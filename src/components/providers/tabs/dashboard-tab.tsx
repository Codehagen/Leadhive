"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Provider } from "@prisma/client";
import { Users, MapPin, Receipt, Clock } from "lucide-react";

interface DashboardTabProps {
  provider: Provider & {
    leads: any[];
    zones: any[];
  };
}

export function DashboardTab({ provider }: DashboardTabProps) {
  const stats = [
    {
      title: "Total Leads",
      value: provider.leads.length,
      description: "Total leads received",
      icon: Users,
    },
    {
      title: "Active Zones",
      value: provider.zones.length,
      description: "Service areas",
      icon: MapPin,
    },
    {
      title: "Revenue",
      value: "kr 0",
      description: "Total revenue",
      icon: Receipt,
    },
    {
      title: "Response Time",
      value: "0m",
      description: "Average response time",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent activity to show
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No quick actions available
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
