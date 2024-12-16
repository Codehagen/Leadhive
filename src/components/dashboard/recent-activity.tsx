"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface RecentActivityProps {
  recentTransactions: any[];
  recentLeads: any[];
}

export function RecentActivity({
  recentTransactions,
  recentLeads,
}: RecentActivityProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Link
                      href={`/providers/${transaction.providerId}`}
                      className="hover:underline font-medium"
                    >
                      {transaction.provider.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: transaction.currency,
                    }).format(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "COMPLETED"
                          ? "default"
                          : transaction.status === "REFUNDED"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {transaction.status.toLowerCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Link
                      href={`/leads/${lead.id}`}
                      className="hover:underline font-medium"
                    >
                      {lead.customerName}
                    </Link>
                  </TableCell>
                  <TableCell>{lead.zone?.name || "Unknown"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {lead.leadProviders.some(
                        (lp) => lp.status === "ACCEPTED"
                      ) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span>
                        {lead.leadProviders.some(
                          (lp) => lp.status === "ACCEPTED"
                        )
                          ? "Accepted"
                          : "Pending"}
                      </span>
                    </div>
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
