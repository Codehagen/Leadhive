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
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadialBar,
  RadialBarChart,
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

// Mock data for provider analytics
const mockData = {
  metrics: {
    totalProviders: 45,
    providerGrowth: 8.2,
    activeRate: 85.5,
    activeRateChange: 3.2,
    avgResponseTime: 2.8,
    responseTimeChange: -12.5,
    avgLeadsPerProvider: 15,
    leadsPerProviderChange: 5.8,
  },
  providerActivity: Array.from({ length: 12 }, (_, i) => ({
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][i],
    active: Math.floor(Math.random() * 20) + 30,
    new: Math.floor(Math.random() * 10) + 5,
  })),
  performanceDistribution: [
    { name: "Excellent", value: 35, fill: "hsl(var(--success))" },
    { name: "Good", value: 45, fill: "hsl(var(--warning))" },
    { name: "Average", value: 15, fill: "hsl(var(--muted))" },
    { name: "Poor", value: 5, fill: "hsl(var(--destructive))" },
  ],
  topProviders: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Provider ${i + 1}`,
    responseTime: Math.random() * 2 + 1,
    conversionRate: Math.floor(Math.random() * 20) + 70,
    leadsAccepted: Math.floor(Math.random() * 50) + 30,
    revenue: Math.floor(Math.random() * 50000) + 20000,
  })),
  categoryDistribution: [
    { category: "Home Services", providers: 15, growth: 12.5 },
    { category: "Construction", providers: 12, growth: 8.3 },
    { category: "Renovation", providers: 10, growth: 15.2 },
    { category: "Landscaping", providers: 8, growth: 5.7 },
  ],
};

export function ProviderAnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Providers"
          value={mockData.metrics.totalProviders}
          change={mockData.metrics.providerGrowth}
          format="number"
        />
        <MetricCard
          title="Active Rate"
          value={mockData.metrics.activeRate}
          change={mockData.metrics.activeRateChange}
          format="percentage"
        />
        <MetricCard
          title="Avg Response Time"
          value={mockData.metrics.avgResponseTime}
          change={mockData.metrics.responseTimeChange}
          format="time"
          suffix="hours"
          reverseColors
        />
        <MetricCard
          title="Leads per Provider"
          value={mockData.metrics.avgLeadsPerProvider}
          change={mockData.metrics.leadsPerProviderChange}
          format="number"
          suffix="leads"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Provider Activity Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Provider Activity</CardTitle>
            <CardDescription>Monthly active and new providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={mockData.providerActivity}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
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
                                Active Providers
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].value}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                New Providers
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[1].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="new"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>Provider performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                innerRadius="30%"
                outerRadius="100%"
                data={mockData.performanceDistribution}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  label={{ position: "insideStart", fill: "#fff" }}
                  background
                  dataKey="value"
                  cornerRadius={12}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].payload.name}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}%
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-sm mt-4">
              {mockData.performanceDistribution.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Providers</CardTitle>
          <CardDescription>
            Based on response time and conversion rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Leads Accepted</TableHead>
                <TableHead>Revenue Generated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.topProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>{provider.responseTime.toFixed(1)}h</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        provider.conversionRate >= 80 ? "default" : "secondary"
                      }
                    >
                      {provider.conversionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell>{provider.leadsAccepted} leads</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(provider.revenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
          <CardDescription>Providers by category and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Active Providers</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.categoryDistribution.map((category) => (
                <TableRow key={category.category}>
                  <TableCell className="font-medium">
                    {category.category}
                  </TableCell>
                  <TableCell>{category.providers} providers</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {category.growth >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        category.growth >= 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {category.growth >= 0 ? "+" : ""}
                      {category.growth}%
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
