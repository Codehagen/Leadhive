"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Mail, Eye, Send } from "lucide-react";
import { generateOutreachEmail } from "@/app/actions/provider-acquisition/generate-outreach-email";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface OutreachPlannerProps {
  selectedBusinesses: BusinessData[];
  zoneName: string;
}

interface EmailContent {
  subject: string;
  body: string;
  callToAction: string;
}

interface BusinessData {
  name: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  description: string;
  relevanceScore: number;
  category: string;
  yearsFounded?: number;
  employeeCount?: string;
  socialProfiles?: string[];
}

interface Business extends BusinessData {
  status: "pending" | "generated" | "sent" | "responded";
  emailContent?: EmailContent;
}

export function OutreachPlanner({
  selectedBusinesses,
  zoneName,
}: OutreachPlannerProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const initialBusinesses = selectedBusinesses.map((business) => ({
      ...business,
      status: "pending" as const,
    }));
    setBusinesses(initialBusinesses);
  }, [selectedBusinesses]);

  const handleGenerateEmail = async (business: Business) => {
    setIsLoading(business.name);
    setError(null);
    try {
      const result = await generateOutreachEmail({
        businessName: business.name,
        category: business.category,
        zone: zoneName,
      });

      if (result.success && result.data) {
        const emailContent: EmailContent = {
          subject: result.data.subject || "",
          body: result.data.body || "",
          callToAction: result.data.callToAction || "",
        };

        const updatedBusinesses = businesses.map((b) =>
          b.name === business.name
            ? {
                ...b,
                status: "generated" as const,
                emailContent,
              }
            : b
        );
        setBusinesses(updatedBusinesses);
        setSelectedBusiness(
          updatedBusinesses.find((b) => b.name === business.name) || null
        );
        setIsDialogOpen(true);
        toast.success("Email generated successfully");
      }
    } catch (error) {
      console.error("Error generating email:", error);
      setError("Failed to generate email");
      toast.error("Failed to generate email");
    } finally {
      setIsLoading(null);
    }
  };

  const handleSendEmail = async (business: Business) => {
    toast.success("Email sent successfully");
    const updatedBusinesses = businesses.map((b) =>
      b.name === business.name
        ? {
            ...b,
            status: "sent" as const,
          }
        : b
    );
    setBusinesses(updatedBusinesses);
    setIsDialogOpen(false);
  };

  if (businesses.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No businesses selected. Please go back and select businesses to
          contact.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-0">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businesses.map((business) => (
                <TableRow key={business.name}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{business.name}</div>
                      {business.email && (
                        <div className="text-sm text-muted-foreground">
                          {business.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{business.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        business.status === "responded"
                          ? "default"
                          : business.status === "sent"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {business.status === "pending" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateEmail(business)}
                          disabled={isLoading !== null}
                        >
                          {isLoading === business.name ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Mail className="h-4 w-4" />
                          )}
                        </Button>
                      ) : business.status === "generated" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedBusiness(business);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>
              Review and customize the email for {selectedBusiness?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedBusiness?.emailContent && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input value={selectedBusiness.emailContent.subject} readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Body</label>
                <Textarea
                  value={selectedBusiness.emailContent.body}
                  readOnly
                  className="min-h-[200px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Call to Action</label>
                <Input
                  value={selectedBusiness.emailContent.callToAction}
                  readOnly
                />
              </div>
              <Button
                className="w-full"
                onClick={() =>
                  selectedBusiness && handleSendEmail(selectedBusiness)
                }
              >
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
