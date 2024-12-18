"use client";

import { useState } from "react";
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
import { Plus, MapPin, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findZoneByPostalCode } from "@/app/actions/zone/find-zone";
import { toast } from "sonner";
import { updateProviderZones } from "@/app/actions/provider/update-provider-zones";

interface ZonesTabProps {
  provider: Provider & {
    zones: any[];
  };
}

export function ZonesTab({ provider }: ZonesTabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [foundZone, setFoundZone] = useState<any | null>(null);

  // Handle postcode search
  const handlePostcodeSearch = async () => {
    if (!postcode) {
      toast.error("Please enter a postcode");
      return;
    }

    setIsLoading(true);
    try {
      const result = await findZoneByPostalCode(postcode, { country: "AU" });
      if (result.success && result.data) {
        // Check if zone is already added
        const isZoneAdded = provider.zones.some(
          (zone) => zone.id === result.data.id
        );
        if (isZoneAdded) {
          toast.error("This zone is already added to your service areas");
          return;
        }
        setFoundZone(result.data);
        toast.success(`Found zone: ${result.data.name}`);
      } else {
        toast.error("No service zone found for this postcode");
        setFoundZone(null);
      }
    } catch (error) {
      toast.error("Error searching for zone");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle zone addition
  const handleAddZone = async () => {
    if (!foundZone) return;

    setIsLoading(true);
    try {
      const result = await updateProviderZones({
        providerId: provider.id,
        zoneId: foundZone.id,
        action: "add",
      });

      if (result.success) {
        toast.success("Zone added successfully");
        setIsOpen(false);
        // Refresh the page to show updated zones
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to add zone");
      }
    } catch (error) {
      toast.error("Error adding zone");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle zone removal
  const handleRemoveZone = async (zoneId: string) => {
    setIsLoading(true);
    try {
      const result = await updateProviderZones({
        providerId: provider.id,
        zoneId: zoneId,
        action: "remove",
      });

      if (result.success) {
        toast.success("Zone removed successfully");
        // Refresh the page to show updated zones
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to remove zone");
      }
    } catch (error) {
      toast.error("Error removing zone");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Service Zones</h2>
          <p className="text-muted-foreground">
            Manage your service areas and coverage zones
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Zone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Service Zone</DialogTitle>
              <DialogDescription>
                Enter a postcode to find and add a new service zone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode</Label>
                <div className="flex gap-2">
                  <Input
                    id="postcode"
                    placeholder="2000"
                    maxLength={4}
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                  <Button onClick={handlePostcodeSearch} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Search"
                    )}
                  </Button>
                </div>
              </div>

              {foundZone && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{foundZone.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {foundZone.state || "Australia"}
                        </p>
                      </div>
                      <Button onClick={handleAddZone} disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Add Zone"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {provider.zones.map((zone) => (
          <Card key={zone.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">
                {zone.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveZone(zone.id)}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Country:</span>
                  <span>{zone.country?.name || "Australia"}</span>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {provider.zones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-medium">{zone.name}</TableCell>
                    <TableCell>{zone.country?.name || "Australia"}</TableCell>
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
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveZone(zone.id)}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
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
            <Button className="mt-4" onClick={() => setIsOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Zone
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
