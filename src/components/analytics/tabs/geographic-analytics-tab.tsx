"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock data for geographic analytics
const mockData = {
  metrics: {
    totalZones: 25,
    zoneGrowth: 12.5,
    avgLeadsPerZone: 45,
    leadsGrowth: 8.2,
    coverageRate: 85.5,
    coverageGrowth: 3.8,
    activeProviders: 120,
    providerGrowth: 15.3,
  },
  zonePerformance: [
    { zone: "New York", leads: 150, providers: 25, coverage: 92 },
    { zone: "Los Angeles", leads: 120, providers: 20, coverage: 88 },
    { zone: "Chicago", leads: 90, providers: 15, coverage: 85 },
    { zone: "Houston", leads: 80, providers: 12, coverage: 82 },
    { zone: "Phoenix", leads: 70, providers: 10, coverage: 78 },
  ],
  leadDistribution: [
    { region: "Northeast", value: 350, growth: 12.5 },
    { region: "West", value: 280, growth: 8.3 },
    { region: "Midwest", value: 220, growth: 15.2 },
    { region: "South", value: 180, growth: 5.7 },
    { region: "Southwest", value: 150, growth: 10.1 },
  ],
  providerDensity: [
    { region: "Northeast", density: 85, change: 5.2 },
    { region: "West", density: 75, change: 3.8 },
    { region: "Midwest", density: 65, change: 7.5 },
    { region: "South", density: 55, change: 4.2 },
    { region: "Southwest", density: 45, change: 6.8 },
  ],
  expansionOpportunities: [
    {
      region: "Northeast",
      potential: "High",
      demand: 250,
      currentCoverage: 85,
      growth: 12.5,
    },
    {
      region: "West",
      potential: "Medium",
      demand: 200,
      currentCoverage: 75,
      growth: 8.3,
    },
    {
      region: "Midwest",
      potential: "High",
      demand: 180,
      currentCoverage: 65,
      growth: 15.2,
    },
    {
      region: "South",
      potential: "Medium",
      demand: 150,
      currentCoverage: 55,
      growth: 5.7,
    },
    {
      region: "Southwest",
      potential: "High",
      demand: 120,
      currentCoverage: 45,
      growth: 10.1,
    },
  ],
};

export function GeographicAnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Zones"
          value={mockData.metrics.totalZones}
          change={mockData.metrics.zoneGrowth}
          format="number"
          suffix="zones"
        />
        <MetricCard
          title="Leads per Zone"
          value={mockData.metrics.avgLeadsPerZone}
          change={mockData.metrics.leadsGrowth}
          format="number"
          suffix="leads"
        />
        <MetricCard
          title="Coverage Rate"
          value={mockData.metrics.coverageRate}
          change={mockData.metrics.coverageGrowth}
          format="percentage"
        />
        <MetricCard
          title="Active Providers"
          value={mockData.metrics.activeProviders}
          change={mockData.metrics.providerGrowth}
          format="number"
          suffix="providers"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Lead Distribution by Region */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Distribution</CardTitle>
            <CardDescription>Leads by geographic region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockData.leadDistribution}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="region"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Leads
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].value}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Growth
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].payload.growth}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Provider Density by Region */}
        <Card>
          <CardHeader>
            <CardTitle>Provider Density</CardTitle>
            <CardDescription>Provider coverage by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockData.providerDensity}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="region"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Coverage Density
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].value}%
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Change
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].payload.change}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="density"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Zone Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Performance</CardTitle>
          <CardDescription>Performance metrics by zone</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead>Total Leads</TableHead>
                <TableHead>Active Providers</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.zonePerformance.map((zone) => (
                <TableRow key={zone.zone}>
                  <TableCell className="font-medium">{zone.zone}</TableCell>
                  <TableCell>{zone.leads} leads</TableCell>
                  <TableCell>{zone.providers} providers</TableCell>
                  <TableCell>{zone.coverage}%</TableCell>
                  <TableCell>
                    <Badge
                      variant={zone.coverage >= 85 ? "default" : "secondary"}
                    >
                      {zone.coverage >= 85 ? "Optimal" : "Growing"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Expansion Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Expansion Opportunities</CardTitle>
          <CardDescription>Market potential by region</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Market Potential</TableHead>
                <TableHead>Demand</TableHead>
                <TableHead>Current Coverage</TableHead>
                <TableHead>Growth Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.expansionOpportunities.map((opportunity) => (
                <TableRow key={opportunity.region}>
                  <TableCell className="font-medium">
                    {opportunity.region}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        opportunity.potential === "High"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {opportunity.potential}
                    </Badge>
                  </TableCell>
                  <TableCell>{opportunity.demand} leads/month</TableCell>
                  <TableCell>{opportunity.currentCoverage}%</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">
                      +{opportunity.growth}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  format,
  suffix,
  reverseColors = false,
}: {
  title: string;
  value: number;
  change: number;
  format: "number" | "percentage" | "currency" | "time";
  suffix?: string;
  reverseColors?: boolean;
}) {
  const formattedValue =
    format === "currency"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value)
      : format === "percentage"
        ? `${value}%`
        : format === "time"
          ? value.toFixed(1)
          : value.toLocaleString();

  const isPositive = reverseColors ? change <= 0 : change >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formattedValue}
          {suffix && (
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              {suffix}
            </span>
          )}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          {isPositive ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {change >= 0 ? "+" : ""}
            {change}%
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
