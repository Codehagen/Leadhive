import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, formatDistanceToNow } from "date-fns";
import { nb } from "date-fns/locale";
import {
  Building,
  MapPin,
  Users,
  Calendar,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { Provider } from "@prisma/client";
import { ProviderEditSheet } from "./provider-edit-sheet";
import { AddCategoryDialog } from "./dialogs/add-category-dialog";
import { CategoryBadge } from "./category-badge";

interface ProviderDetailsCardProps {
  provider: Provider & {
    categories: any[];
    zones: any[];
    leadProviders: any[];
  };
}

export function ProviderDetailsCard({ provider }: ProviderDetailsCardProps) {
  const addedTimeAgo = formatDistanceToNow(new Date(provider.createdAt), {
    addSuffix: true,
  });

  const infoItems = [
    {
      icon: Building,
      label: "Org.nr",
      value: provider.orgnr,
    },
    {
      icon: MapPin,
      label: "Address",
      value: `${provider.address}, ${provider.zip} ${provider.city}`,
    },
    {
      icon: Users,
      label: "Max Users",
      value: provider.maxUsers.toString(),
    },
    {
      icon: Calendar,
      label: "Created",
      value: format(new Date(provider.createdAt), "PPP", { locale: nb }),
      displayValue: addedTimeAgo,
    },
    {
      icon: Globe,
      label: "Industry",
      value: provider.industry || "Not specified",
    },
    {
      icon: Mail,
      label: "Contact Email",
      value: provider.contactEmail,
    },
    {
      icon: Phone,
      label: "Contact Name",
      value: provider.contactName,
    },
  ];

  return (
    <Card className="w-full relative">
      <ProviderEditSheet provider={provider} />
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              {provider.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold truncate">
                {provider.name}
              </h3>
              <Badge
                variant={
                  provider.status === "ACTIVE"
                    ? "default"
                    : provider.status === "PENDING_ONBOARDING"
                      ? "secondary"
                      : "destructive"
                }
              >
                {provider.status.toLowerCase().replace("_", " ")}
              </Badge>
            </div>
            <span className="block text-xs text-muted-foreground mt-1">
              Added {addedTimeAgo}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground font-medium min-w-[100px]">
                {item.label}:
              </span>
              <span className="text-sm text-muted-foreground">
                {item.displayValue || item.value}
              </span>
            </div>
          ))}

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-muted-foreground">
                Categories ({provider.categories.length})
              </h4>
              <AddCategoryDialog provider={provider} />
            </div>
            <div className="flex flex-wrap gap-2">
              {provider.categories.map((category: any) => (
                <CategoryBadge
                  key={category.id}
                  category={category}
                  providerId={provider.id}
                />
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Zones ({provider.zones.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {provider.zones.map((zone: any) => (
                <Badge key={zone.id} variant="outline">
                  {zone.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Leads ({provider.leadProviders.length})
            </h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
