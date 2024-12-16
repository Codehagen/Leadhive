import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
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
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Receipt,
} from "lucide-react";
import Link from "next/link";

async function getPaymentStats() {
  const [transactions, providers] = await Promise.all([
    prisma.transaction.findMany({
      include: {
        provider: true,
        lead: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.provider.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  const totalRevenue = transactions
    .filter((t) => t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter((t) => t.status === "PENDING")
    .reduce((sum, t) => sum + t.amount, 0);

  const completedTransactions = transactions.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  const pendingTransactions = transactions.filter(
    (t) => t.status === "PENDING"
  ).length;

  return {
    transactions,
    totalRevenue,
    pendingAmount,
    completedTransactions,
    pendingTransactions,
    activeProviders: providers,
  };
}

export default async function PaymentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const stats = await getPaymentStats();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            Manage and monitor all payment activities
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              From completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(stats.pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              From pending transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transaction Success
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.completedTransactions} / {stats.transactions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Providers
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProviders}</div>
            <p className="text-xs text-muted-foreground">With payment setup</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.transactions.length === 0 ? (
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
                  <TableHead>Provider</TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.transactions.map((transaction) => (
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
                      <Link
                        href={`/leads/${transaction.leadId}`}
                        className="hover:underline"
                      >
                        {transaction.lead.customerName}
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
