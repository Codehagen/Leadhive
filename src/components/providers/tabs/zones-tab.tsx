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
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";

interface ZonesTabProps {
  provider: Provider & {
    zones: any[];
  };
}

export function ZonesTab({ provider }: ZonesTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Service Zones</h2>
          <p className="text-muted-foreground">
            Manage your service areas and coverage zones
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Zone
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {provider.zones.map((zone) => (
          <Card key={zone.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">
                {zone.name}
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Country:</span>
                  <span>{zone.country?.name || "Not set"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">
                    Postal Codes:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {zone.postalCodes?.slice(0, 3).map((code: string) => (
                      <Badge key={code} variant="secondary">
                        {code}
                      </Badge>
                    ))}
                    {zone.postalCodes?.length > 3 && (
                      <Badge variant="secondary">
                        +{zone.postalCodes.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {provider.zones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zone Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Postal Codes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {provider.zones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-medium">{zone.name}</TableCell>
                    <TableCell>{zone.country?.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {zone.postalCodes?.slice(0, 3).map((code: string) => (
                          <Badge key={code} variant="outline">
                            {code}
                          </Badge>
                        ))}
                        {zone.postalCodes?.length > 3 && (
                          <Badge variant="outline">
                            +{zone.postalCodes.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {provider.zones.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <MapPin className="h-8 w-8 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Zones Added</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm mt-1">
              This provider hasn't added any service zones yet. Add a zone to
              start receiving leads in specific areas.
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add First Zone
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
