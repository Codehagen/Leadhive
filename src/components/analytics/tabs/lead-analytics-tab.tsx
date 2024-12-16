"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Area,
  AreaChart,
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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data for lead analytics
const mockData = {
  metrics: {
    totalLeads: 320,
    leadGrowth: 15.3,
    averageResponseTime: 2.5,
    responseTimeChange: -8.2,
    conversionRate: 68.5,
    conversionChange: 5.1,
    activeProviders: 45,
    providerChange: 8.2,
  },
  leadTrend: Array.from({ length: 12 }, (_, i) => ({
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
    leads: Math.floor(Math.random() * 50) + 20,
    converted: Math.floor(Math.random() * 30) + 10,
  })),
  conversionByCategory: [
    { category: "Home Services", rate: 75, volume: 120 },
    { category: "Construction", rate: 68, volume: 85 },
    { category: "Renovation", rate: 62, volume: 65 },
    { category: "Landscaping", rate: 58, volume: 50 },
  ],
  responseTimeDistribution: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    volume: Math.floor(Math.random() * 30) + 5,
  })),
  recentLeads: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    customerName: `Customer ${i + 1}`,
    category: ["Home Services", "Construction", "Renovation", "Landscaping"][
      Math.floor(Math.random() * 4)
    ],
    status: ["Accepted", "Pending", "Declined"][Math.floor(Math.random() * 3)],
    responseTime: Math.floor(Math.random() * 24) + 1,
    providers: Math.floor(Math.random() * 5) + 1,
  })),
};

const chartConfig = {
  leads: {
    label: "Total Leads",
    color: "hsl(var(--chart-1))",
  },
  converted: {
    label: "Converted",
    color: "hsl(var(--chart-2))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function LeadAnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Leads"
          value={mockData.metrics.totalLeads}
          change={mockData.metrics.leadGrowth}
          format="number"
          suffix="leads"
        />
        <MetricCard
          title="Avg. Response Time"
          value={mockData.metrics.averageResponseTime}
          change={mockData.metrics.responseTimeChange}
          format="time"
          suffix="hours"
          reverseColors
        />
        <MetricCard
          title="Conversion Rate"
          value={mockData.metrics.conversionRate}
          change={mockData.metrics.conversionChange}
          format="percentage"
        />
        <MetricCard
          title="Active Providers"
          value={mockData.metrics.activeProviders}
          change={mockData.metrics.providerChange}
          format="number"
          suffix="providers"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Lead Volume Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Volume Trend</CardTitle>
            <CardDescription>
              Monthly lead volume and conversions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={mockData.leadTrend}
                margin={{ left: 12, right: 12 }}
                height={300}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="var(--color-leads)"
                  fill="var(--color-leads)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="converted"
                  stroke="var(--color-converted)"
                  fill="var(--color-converted)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Response Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Distribution</CardTitle>
            <CardDescription>Lead response time by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={mockData.responseTimeDistribution}
                margin={{ left: 12, right: 12 }}
                height={300}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}h`}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="volume"
                  fill="var(--color-volume)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
          <CardDescription>Lead conversion rates by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Lead Volume</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.conversionByCategory.map((category) => (
                <TableRow key={category.category}>
                  <TableCell className="font-medium">
                    {category.category}
                  </TableCell>
                  <TableCell>{category.volume} leads</TableCell>
                  <TableCell>{category.rate}%</TableCell>
                  <TableCell>
                    <Badge
                      variant={category.rate >= 70 ? "default" : "secondary"}
                    >
                      {category.rate >= 70 ? "High" : "Average"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Latest lead activity and status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Providers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.recentLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    {lead.customerName}
                  </TableCell>
                  <TableCell>{lead.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        lead.status === "Accepted"
                          ? "default"
                          : lead.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.responseTime}h</TableCell>
                  <TableCell>{lead.providers} providers</TableCell>
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
