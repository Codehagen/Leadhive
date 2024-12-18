import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { redirect } from "next/navigation";
import { getLeads } from "@/app/actions/lead/get-leads";
import { LeadsClient } from "@/components/leads/leads-client";
import { LeadsTableSkeleton } from "@/components/leads/tables/skeleton";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, CheckCircle, XCircle } from "lucide-react";

export default async function LeadsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Hey {user?.name?.split(" ")[0]}, Welcome back 👋
        </h2>
        <div className="flex items-center space-x-2">
          {/* Add action buttons here if needed */}
        </div>
      </div>

      {/* Lead Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="text-2xl font-bold">...</div>}>
              <LeadStatsContent type="total" />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="text-2xl font-bold">...</div>}>
              <LeadStatsContent type="new" />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="text-2xl font-bold">...</div>}>
              <LeadStatsContent type="accepted" />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Declined</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="text-2xl font-bold">...</div>}>
              <LeadStatsContent type="declined" />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsContent />
      </Suspense>
    </div>
  );
}

async function LeadsContent() {
  const leadsResponse = await getLeads();
  if (!leadsResponse.success) {
    throw new Error(leadsResponse.error);
  }

  return <LeadsClient data={leadsResponse.data} />;
}

async function LeadStatsContent({
  type,
}: {
  type: "total" | "new" | "accepted" | "declined";
}) {
  const leadsResponse = await getLeads();
  if (!leadsResponse.success) {
    return <div className="text-2xl font-bold">-</div>;
  }

  const leads = leadsResponse.data;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let count = 0;
  switch (type) {
    case "total":
      count = leads.length;
      break;
    case "new":
      count = leads.filter((lead) => {
        const leadDate = new Date(lead.createdAt);
        leadDate.setHours(0, 0, 0, 0);
        return leadDate.getTime() === today.getTime();
      }).length;
      break;
    case "accepted":
      count = leads.filter((lead) => lead.status === "ACCEPTED").length;
      break;
    case "declined":
      count = leads.filter((lead) => lead.status === "DECLINED").length;
      break;
  }

  return (
    <>
      <div className="text-2xl font-bold">{count}</div>
      <p className="text-xs text-muted-foreground">
        {type === "new"
          ? "+0% from yesterday"
          : type === "total"
            ? "All time leads"
            : `${((count / leads.length) * 100).toFixed(1)}% of total`}
      </p>
    </>
  );
}
