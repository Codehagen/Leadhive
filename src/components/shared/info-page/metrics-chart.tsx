"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", leads: 120, sales: 95 },
  { month: "Feb", leads: 180, sales: 140 },
  { month: "Mar", leads: 220, sales: 170 },
  { month: "Apr", leads: 280, sales: 215 },
  { month: "May", leads: 350, sales: 270 },
  { month: "Jun", leads: 420, sales: 325 },
];

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-1)",
  },
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MetricsChart() {
  return (
    <div className="w-full h-[400px] ">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--secondary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--secondary))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="leads"
              stroke="hsl(var(--primary))"
              fill="url(#colorLeads)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--secondary))"
              fill="url(#colorRevenue)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
