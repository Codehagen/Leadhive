"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { updateProviderCategories } from "@/app/actions/provider/update-provider-categories";
import { toast } from "sonner";

interface CategoryBadgeProps {
  category: {
    id: string;
    name: string;
  };
  providerId: string;
}

export function CategoryBadge({ category, providerId }: CategoryBadgeProps) {
  const handleRemove = async () => {
    try {
      const result = await updateProviderCategories({
        providerId,
        categoryId: category.id,
        action: "remove",
      });

      if (result.success) {
        toast.success("Category removed successfully");
        // Refresh the page to show updated categories
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to remove category");
      }
    } catch (error) {
      toast.error("Error removing category");
    }
  };

  return (
    <Badge variant="outline" className="flex items-center gap-1">
      {category.name}
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4 ml-1 hover:bg-transparent"
        onClick={handleRemove}
      >
        <X className="h-3 w-3" />
      </Button>
    </Badge>
  );
}
