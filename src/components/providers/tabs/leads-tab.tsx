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

interface LeadsTabProps {
  provider: Provider & {
    leads: any[];
  };
}

export function LeadsTab({ provider }: LeadsTabProps) {
  const leadStatuses = {
    ACCEPTED: { label: "Accepted", variant: "default" as const },
    PENDING: { label: "Pending", variant: "secondary" as const },
    REJECTED: { label: "Rejected", variant: "destructive" as const },
    EXPIRED: { label: "Expired", variant: "outline" as const },
  };

  const totalLeads = provider.leads.length;
  const acceptedLeads = provider.leads.filter(
    (lead) => lead.status === "ACCEPTED"
  ).length;
  const pendingLeads = provider.leads.filter(
    (lead) => lead.status === "PENDING"
  ).length;

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
          {provider.leads.length === 0 ? (
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
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Response Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {provider.leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">
                      {lead.customerName}
                    </TableCell>
                    <TableCell>{lead.serviceDetails}</TableCell>
                    <TableCell>{lead.postalCode}</TableCell>
                    <TableCell>
                      <Badge variant={leadStatuses[lead.status].variant}>
                        {leadStatuses[lead.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(lead.createdAt), "MMM d, HH:mm")}
                    </TableCell>
                    <TableCell>
                      {lead.responseTime ? `${lead.responseTime}m` : "-"}
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
