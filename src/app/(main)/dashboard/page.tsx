import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { Suspense } from "react";

async function getDashboardStats() {
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 6);

  const [transactions, leads, providers, monthlyStats] = await Promise.all([
    // Get recent transactions
    prisma.transaction.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        provider: true,
        lead: true,
      },
    }),
    // Get recent leads
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        zone: true,
        leadProviders: {
          include: {
            provider: true,
          },
        },
      },
    }),
    // Get active providers count
    prisma.provider.count({
      where: { status: "ACTIVE" },
    }),
    // Get monthly stats for the last 6 months
    Promise.all(
      Array.from({ length: 6 }).map(async (_, i) => {
        const date = subMonths(now, i);
        const start = startOfMonth(date);
        const end = endOfMonth(date);

        const [monthlyTransactions, monthlyLeads] = await Promise.all([
          prisma.transaction.aggregate({
            where: {
              createdAt: {
                gte: start,
                lte: end,
              },
              status: "COMPLETED",
            },
            _sum: {
              amount: true,
            },
          }),
          prisma.lead.count({
            where: {
              createdAt: {
                gte: start,
                lte: end,
              },
            },
          }),
        ]);

        return {
          month: format(date, "MMMM"),
          revenue: monthlyTransactions._sum.amount || 0,
          leads: monthlyLeads,
        };
      })
    ),
  ]);

  // Calculate total revenue
  const totalRevenue = transactions
    .filter((t) => t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate lead conversion rate
  const totalLeads = leads.length;
  const convertedLeads = leads.filter((lead) =>
    lead.leadProviders.some((lp) => lp.status === "ACCEPTED")
  ).length;
  const conversionRate =
    totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

  return {
    recentTransactions: transactions,
    recentLeads: leads,
    activeProviders: providers,
    totalRevenue,
    conversionRate,
    monthlyStats: monthlyStats.reverse(), // Most recent month first
  };
}

async function DashboardContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const stats = await getDashboardStats();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Hey {user?.name?.split(" ")[0]}, Welcome back 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your platform
          </p>
        </div>
      </div>

      <OverviewCards stats={stats} />
      <DashboardCharts monthlyStats={stats.monthlyStats} />
      <RecentActivity
        recentTransactions={stats.recentTransactions}
        recentLeads={stats.recentLeads}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
