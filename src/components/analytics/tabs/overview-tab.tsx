"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
  PieChart,
  Pie,
  Label,
  Cell,
  AreaChart,
  Area,
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
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Target,
} from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// This would come from your server component
const mockData = {
  metrics: {
    totalRevenue: 125000,
    revenueGrowth: 12.5,
    activeProviders: 45,
    providerGrowth: 8.2,
    totalLeads: 320,
    leadGrowth: 15.3,
    conversionRate: 68.5,
    conversionGrowth: 5.1,
  },
  revenueData: Array.from({ length: 12 }, (_, i) => ({
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
    revenue: Math.floor(Math.random() * 50000) + 20000,
    growth: Math.floor(Math.random() * 5000) + 1000,
  })),
  leadDistribution: [
    { name: "Accepted", value: 63, color: "hsl(var(--success))" },
    { name: "Pending", value: 22, color: "hsl(var(--warning))" },
    { name: "Declined", value: 15, color: "hsl(var(--destructive))" },
  ],
  conversionData: Array.from({ length: 12 }, (_, i) => ({
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
  topPerformers: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Provider ${i + 1}`,
    leads: Math.floor(Math.random() * 50) + 20,
    conversion: Math.floor(Math.random() * 40) + 60,
    revenue: Math.floor(Math.random() * 20000) + 5000,
  })),
};

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  growth: {
    label: "Growth",
    color: "hsl(var(--chart-2))",
  },
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-3))",
  },
  converted: {
    label: "Converted",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function OverviewTab() {
  const totalLeads = mockData.leadDistribution.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={mockData.metrics.totalRevenue}
          change={mockData.metrics.revenueGrowth}
          format="currency"
          icon={DollarSign}
        />
        <MetricCard
          title="Active Providers"
          value={mockData.metrics.activeProviders}
          change={mockData.metrics.providerGrowth}
          icon={Users}
        />
        <MetricCard
          title="Total Leads"
          value={mockData.metrics.totalLeads}
          change={mockData.metrics.leadGrowth}
          icon={Activity}
        />
        <MetricCard
          title="Conversion Rate"
          value={mockData.metrics.conversionRate}
          change={mockData.metrics.conversionGrowth}
          format="percentage"
          icon={Target}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={mockData.revenueData}
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
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
                    }).format(value)
                  }
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Revenue
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(Number(payload[0].value))}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Growth
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(Number(payload[0].payload.growth))}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  fillOpacity={0.2}
                  stroke="var(--color-revenue)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Revenue trend for the last 12 months
            </div>
          </CardFooter>
        </Card>

        {/* Lead Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Distribution</CardTitle>
            <CardDescription>Current lead status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex aspect-square items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockData.leadDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    {mockData.leadDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        const { cx = 0, cy = 0 } = viewBox as {
                          cx: number;
                          cy: number;
                        };
                        const yOffset = 20;
                        return (
                          <text
                            x={cx}
                            y={cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={cx}
                              y={cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalLeads}
                            </tspan>
                            <tspan
                              x={cx}
                              y={Number(cy) + yOffset}
                              className="fill-muted-foreground text-sm"
                            >
                              Total Leads
                            </tspan>
                          </text>
                        );
                      }}
                    />
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {payload[0].name}
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].value} leads
                              </span>
                              <span className="text-[0.70rem] text-muted-foreground">
                                {(
                                  (payload[0].value / totalLeads) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              {mockData.leadDistribution.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Providers</CardTitle>
          <CardDescription>
            Based on lead conversion and revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Total Leads</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Revenue Generated</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.topPerformers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>{provider.leads}</TableCell>
                  <TableCell>{provider.conversion}%</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(provider.revenue)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        provider.conversion >= 75 ? "default" : "secondary"
                      }
                    >
                      {provider.conversion >= 75 ? "Excellent" : "Good"}
                    </Badge>
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
  icon: Icon,
}: {
  title: string;
  value: number;
  change: number;
  format?: "currency" | "percentage";
  icon: any;
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
        : value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {change >= 0 ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
            {change >= 0 ? "+" : ""}
            {change}%
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
