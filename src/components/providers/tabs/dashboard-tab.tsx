"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Provider } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface DashboardTabProps {
  provider: Provider & {
    leadProviders: any[];
    transactions: any[];
  };
}

export function DashboardTab({ provider }: DashboardTabProps) {
  const leadProviders = provider.leadProviders || [];
  const transactions = provider.transactions || [];

  // Calculate metrics
  const totalLeads = leadProviders.length;
  const acceptedLeads = leadProviders.filter(
    (lp) => lp.status === "ACCEPTED"
  ).length;
  const acceptanceRate =
    totalLeads > 0 ? (acceptedLeads / totalLeads) * 100 : 0;

  const totalRevenue = transactions
    .filter((t) => t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.amount, 0);

  const recentLeads = leadProviders
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              Total leads received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Acceptance Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {acceptanceRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {acceptedLeads} out of {totalLeads} leads accepted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: transactions[0]?.currency || "USD",
              }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              From completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Status
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge
                variant={
                  provider.status === "ACTIVE" ? "default" : "destructive"
                }
              >
                {provider.status.toLowerCase()}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Current account status
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Clock className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Recent Activity</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mt-1">
                You haven't received any leads yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Response</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((leadProvider) => (
                  <TableRow key={leadProvider.id}>
                    <TableCell>
                      <Link
                        href={`/leads/${leadProvider.leadId}`}
                        className="hover:underline font-medium"
                      >
                        {leadProvider.lead?.customerName || leadProvider.leadId}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          leadProvider.status === "ACCEPTED"
                            ? "default"
                            : leadProvider.status === "REJECTED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {leadProvider.status.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(leadProvider.sentAt), "MMM d, HH:mm")}
                    </TableCell>
                    <TableCell>
                      {leadProvider.respondedAt ? (
                        <div className="flex items-center gap-2">
                          {leadProvider.status === "ACCEPTED" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          {format(
                            new Date(leadProvider.respondedAt),
                            "MMM d, HH:mm"
                          )}
                        </div>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
