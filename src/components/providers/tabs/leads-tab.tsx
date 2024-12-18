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
import { Users } from "lucide-react";
import Link from "next/link";

interface LeadsTabProps {
  provider: Provider & {
    leadProviders: Array<{
      id: string;
      status: string;
      sentAt: Date;
      respondedAt: Date | null;
      lead: {
        id: string;
        customerName: string;
        customerEmail: string | null;
        customerPhone: string;
        address: string;
        postalCode: string;
        categoryId: string;
        category: {
          id: string;
          name: string;
          description: string;
          parentId: string | null;
          parent: {
            id: string;
            name: string;
          } | null;
        } | null;
        zone: {
          name: string;
        } | null;
      };
    }>;
  };
}

export function LeadsTab({ provider }: LeadsTabProps) {
  const leadStatuses = {
    SENT: { label: "Sent", variant: "default" as const },
    ACCEPTED: { label: "Accepted", variant: "default" as const },
    DECLINED: { label: "Declined", variant: "destructive" as const },
    PENDING: { label: "Pending", variant: "secondary" as const },
  };

  const providerLeads = provider.leadProviders.map((lp) => ({
    ...lp.lead,
    status: lp.status,
    sentAt: lp.sentAt,
    respondedAt: lp.respondedAt,
  }));

  const totalLeads = providerLeads.length;
  const acceptedLeads = providerLeads.filter(
    (lead) => lead.status === "ACCEPTED"
  ).length;
  const pendingLeads = providerLeads.filter(
    (lead) => lead.status === "PENDING" || lead.status === "SENT"
  ).length;

  // Helper function to get the display category name
  const getCategoryName = (lead: (typeof providerLeads)[0]) => {
    if (!lead.category) return "Unknown Service";
    // If it's a child category, show "Parent - Child"
    if (lead.category.parentId && lead.category.parent) {
      return `${lead.category.parent.name} - ${lead.category.name}`;
    }
    // Otherwise just show the category name
    return lead.category.name;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lead Management</h2>
          <p className="text-muted-foreground">
            View and manage your customer leads
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="h-6">
            {totalLeads} Total Leads
          </Badge>
          <Badge variant="default" className="h-6">
            {acceptedLeads} Accepted
          </Badge>
          <Badge variant="secondary" className="h-6">
            {pendingLeads} Pending
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {providerLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Users className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Leads Yet</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mt-1">
                You haven't received any leads yet. Make sure your zones are set
                up correctly to start receiving leads.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Response Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providerLeads.map((lead) => {
                  const responseTime = lead.respondedAt
                    ? Math.round(
                        (new Date(lead.respondedAt).getTime() -
                          new Date(lead.sentAt).getTime()) /
                          (1000 * 60)
                      )
                    : null;

                  return (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <Link
                          href={`/leads/${lead.id}`}
                          className="flex flex-col hover:underline"
                        >
                          <span className="font-medium">
                            {lead.customerName}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {lead.customerEmail || lead.customerPhone}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {getCategoryName(lead)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {lead.address || "No address provided"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {lead.zone?.name}, {lead.postalCode}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            leadStatuses[lead.status]?.variant || "secondary"
                          }
                        >
                          {leadStatuses[lead.status]?.label ||
                            lead.status.charAt(0).toUpperCase() +
                              lead.status.slice(1).toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(lead.sentAt), "MMM d, HH:mm")}
                      </TableCell>
                      <TableCell>
                        {responseTime !== null ? `${responseTime}m` : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
