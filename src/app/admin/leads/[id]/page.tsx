import { getCurrentUser } from "@/app/actions/user/get-current-user";
import { redirect } from "next/navigation";
import { getLeadDetails } from "@/app/actions/lead/get-lead-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  User,
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Tag,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default async function LeadDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const leadResponse = await getLeadDetails(params.id);
  if (!leadResponse.success) {
    throw new Error(leadResponse.error);
  }

  const lead = leadResponse.data;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Lead Details</h2>
        <Badge
          variant={
            lead.status === "ACCEPTED"
              ? "default"
              : lead.status === "PENDING" || lead.status === "SENT"
                ? "secondary"
                : "destructive"
          }
          className="h-6"
        >
          {lead.status.toLowerCase()}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{lead.customerName}</span>
              </div>
              {lead.customerEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.customerEmail}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lead.customerPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {lead.zone.name}, {lead.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  Created {format(new Date(lead.createdAt), "PPP")} at{" "}
                  {format(new Date(lead.createdAt), "HH:mm")}
                </span>
              </div>
            </div>

            {lead.serviceDetails && (
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Service Details</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {lead.serviceDetails}
                </p>
              </div>
            )}

            {lead.categories.length > 0 && (
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Categories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lead.categories.map((category: any) => (
                    <Badge key={category.id} variant="secondary">
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Lead Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lead.leadProviders.map((lp: any) => (
                  <TableRow key={lp.id}>
                    <TableCell>
                      <Link
                        href={`/providers/${lp.provider.id}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <span className="font-medium">{lp.provider.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2">
                              {lp.status === "ACCEPTED" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : lp.status === "DECLINED" ? (
                                <XCircle className="h-4 w-4 text-red-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              )}
                              <span>{lp.status.toLowerCase()}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              {lp.status === "ACCEPTED"
                                ? "Provider accepted the lead"
                                : lp.status === "DECLINED"
                                  ? "Provider declined the lead"
                                  : "Waiting for provider response"}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(new Date(lp.sentAt), "MMM d, HH:mm")}
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
    </div>
  );
}
