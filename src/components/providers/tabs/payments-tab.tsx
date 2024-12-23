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
import { Receipt, CreditCard, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { refundTransaction } from "@/app/actions/stripe/refund-transaction";
import Link from "next/link";

interface PaymentsTabProps {
  provider: Provider & {
    paymentInfo: any;
    transactions: any[];
    invoices: any[];
  };
}

export function PaymentsTab({ provider }: PaymentsTabProps) {
  const transactions = provider.transactions || [];

  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(
    (transaction) => transaction.status === "COMPLETED"
  ).length;
  const pendingTransactions = transactions.filter(
    (transaction) => transaction.status === "PENDING"
  ).length;

  const totalRevenue = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const paidAmount = transactions
    .filter((transaction) => transaction.status === "COMPLETED")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const handleRefund = async (transactionId: string) => {
    try {
      const result = await refundTransaction(transactionId);
      if (result.success) {
        toast.success("Transaction refunded successfully");
      } else {
        toast.error(result.error || "Failed to refund transaction");
      }
    } catch (error) {
      toast.error("An error occurred while processing the refund");
    }
  };

  const openStripePortal = () => {
    if (provider.paymentInfo?.accountId) {
      window.open(
        `https://dashboard.stripe.com/test/customers/${provider.paymentInfo.accountId}`,
        "_blank"
      );
    } else {
      toast.error("No Stripe account connected");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment History</h2>
          <p className="text-muted-foreground">
            View payment history and manage transactions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={openStripePortal}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open Stripe Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="h-6">
              {totalTransactions} Total
            </Badge>
            <Badge variant="outline" className="h-6">
              {completedTransactions} Completed
            </Badge>
            <Badge variant="secondary" className="h-6">
              {pendingTransactions} Pending
            </Badge>
          </div>
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
                currency: transactions[0]?.currency || "USD",
              }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total revenue from leads
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
                currency: transactions[0]?.currency || "USD",
              }).format(paidAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total completed transactions
            </p>
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
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Receipt className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Transactions Yet</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mt-1">
                No transactions have been processed yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Link
                        href={`/leads/${transaction.leadId}`}
                        className="flex items-center hover:underline"
                      >
                        <span className="font-medium">
                          {transaction.leadId}
                        </span>
                        <ExternalLink className="ml-2 h-4 w-4 text-muted-foreground" />
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
                    <TableCell>
                      {format(new Date(transaction.createdAt), "MMM d, HH:mm")}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRefund(transaction.id)}
                              disabled={
                                transaction.status !== "COMPLETED" ||
                                provider.paymentInfo?.accountStatus !== "active"
                              }
                            >
                              Refund
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {transaction.status !== "COMPLETED"
                              ? "Can only refund completed transactions"
                              : provider.paymentInfo?.accountStatus !== "active"
                                ? "Account must be active to process refunds"
                                : "Process refund for this transaction"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
