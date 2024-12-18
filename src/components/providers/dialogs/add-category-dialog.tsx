"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { getCategories } from "@/app/actions/category/get-categories";
import { toast } from "sonner";
import { updateProviderCategories } from "@/app/actions/provider/update-provider-categories";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddCategoryDialogProps {
  provider: {
    id: string;
    categories: any[];
  };
}

export function AddCategoryDialog({ provider }: AddCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);

  // Fetch available categories when dialog opens
  const handleDialogOpen = async (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setIsLoading(true);
      try {
        const result = await getCategories();
        if (result.success) {
          // Filter out categories that the provider already has
          const filteredCategories = result.data.filter(
            (category) =>
              !provider.categories.some((c) => c.id === category.value)
          );
          setAvailableCategories(filteredCategories);
        }
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle category addition
  const handleAddCategory = async (categoryId: string) => {
    setIsLoading(true);
    try {
      const result = await updateProviderCategories({
        providerId: provider.id,
        categoryId,
        action: "add",
      });

      if (result.success) {
        toast.success("Category added successfully");
        setIsOpen(false);
        // Refresh the page to show updated categories
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to add category");
      }
    } catch (error) {
      toast.error("Error adding category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Select a category to add to this provider.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] pr-4">
          <div className="space-y-4 py-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : availableCategories.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {availableCategories.map((category) => (
                  <Card key={category.value} className="border-muted">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base truncate">
                            {category.label}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.description}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleAddCategory(category.value)}
                          disabled={isLoading}
                          className="shrink-0"
                        >
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No more categories available to add.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
