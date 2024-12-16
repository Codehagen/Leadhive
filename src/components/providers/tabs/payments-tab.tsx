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
import { Receipt, CreditCard, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentsTabProps {
  provider: Provider & {
    paymentInfo: any;
    transactions: any[];
    invoices: any[];
  };
}

export function PaymentsTab({ provider }: PaymentsTabProps) {
  const invoiceStatuses = {
    PENDING: { label: "Pending", variant: "secondary" as const },
    SENT: { label: "Sent", variant: "default" as const },
    PAID: { label: "Paid", variant: "outline" as const },
    CANCELLED: { label: "Cancelled", variant: "destructive" as const },
  };

  const invoices = provider.invoices || [];
  const transactions = provider.transactions || [];

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "PAID"
  ).length;
  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "PENDING" || invoice.status === "SENT"
  ).length;

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );
  const paidAmount = invoices
    .filter((invoice) => invoice.status === "PAID")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment History</h2>
          <p className="text-muted-foreground">
            View payment history and manage invoices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="h-6">
            {totalInvoices} Total Invoices
          </Badge>
          <Badge variant="outline" className="h-6">
            {paidInvoices} Paid
          </Badge>
          <Badge variant="secondary" className="h-6">
            {pendingInvoices} Pending
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime revenue from leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(paidAmount)}
            </div>
            <p className="text-xs text-muted-foreground">Total paid invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Status
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge
                variant={
                  provider.paymentInfo?.accountStatus === "active"
                    ? "default"
                    : "secondary"
                }
              >
                {provider.paymentInfo?.accountStatus || "Not Set"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Current account status
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Method
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge
                variant={
                  provider.paymentInfo?.hasPaymentMethod
                    ? "default"
                    : "destructive"
                }
              >
                {provider.paymentInfo?.hasPaymentMethod ? "Active" : "Not Set"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {provider.paymentInfo?.hasPaymentMethod
                ? "Payment method added"
                : "No payment method"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Receipt className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Invoices Yet</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mt-1">
                No invoices have been generated yet. They will appear here once
                created.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Paid At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: invoice.currency || "USD",
                      }).format(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      {invoice.dueDate
                        ? format(new Date(invoice.dueDate), "MMM d, yyyy")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={invoiceStatuses[invoice.status].variant}>
                        {invoiceStatuses[invoice.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {invoice.paidAt
                        ? format(new Date(invoice.paidAt), "MMM d, yyyy")
                        : "-"}
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
