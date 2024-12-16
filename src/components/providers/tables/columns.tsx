import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export type Provider = {
  id: string;
  name: string;
  orgnr: string;
  address: string;
  city: string;
  zip: string;
  contactName: string;
  contactEmail: string;
  maxUsers: number;
  industry: string | null;
  status: "PENDING_ONBOARDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: Date;
  updatedAt: Date;
  zones: any[];
  categories: any[];
  paymentInfo: {
    accountStatus: string;
    hasPaymentMethod: boolean;
  } | null;
  leads: any[];
};

export const columns: ColumnDef<Provider>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Link
            href={`/providers/${row.original.id}`}
            className="flex items-center hover:underline"
          >
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
            <ExternalLink className="ml-2 h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "orgnr",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Org. Number" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "ACTIVE"
              ? "default"
              : status === "PENDING_ONBOARDING"
                ? "secondary"
                : "destructive"
          }
        >
          {status.toLowerCase().replace("_", " ")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "contactName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("contactName")}</span>
          <span className="text-sm text-muted-foreground">
            {row.original.contactEmail}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    cell: ({ row }) => {
      const categories = row.original.categories;
      return (
        <div className="flex flex-wrap gap-1">
          {categories.slice(0, 2).map((category: any) => (
            <Badge key={category.name} variant="outline">
              {category.name}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge variant="outline">+{categories.length - 2}</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "leads",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leads" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.original.leads.length}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.id)}
            >
              Copy provider ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/providers/${row.original.id}`}>View details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit provider</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
