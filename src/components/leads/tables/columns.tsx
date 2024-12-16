"use client";

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
import { format } from "date-fns";

export type Lead = {
  id: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string;
  serviceDetails: string;
  postalCode: string;
  status: "PENDING" | "SENT" | "ACCEPTED" | "DECLINED";
  createdAt: Date;
  updatedAt: Date;
  provider: {
    id: string;
    name: string;
    contactName: string;
    contactEmail: string;
  } | null;
  zone: {
    id: string;
    name: string;
    country: {
      name: string;
      code: string;
    };
  };
  categories: any[];
  Transaction: any[];
  leadProviders: any[];
};

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("customerName")}</span>
          <span className="text-sm text-muted-foreground">
            {row.original.customerEmail || row.original.customerPhone}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "serviceDetails",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => {
      const provider = row.original.provider;
      return provider ? (
        <div className="flex items-center space-x-2">
          <Link
            href={`/providers/${provider.id}`}
            className="flex items-center hover:underline"
          >
            <span className="max-w-[200px] truncate font-medium">
              {provider.name}
            </span>
            <ExternalLink className="ml-2 h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      ) : (
        <span className="text-muted-foreground">Unassigned</span>
      );
    },
  },
  {
    accessorKey: "zone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      const zone = row.original.zone;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{zone.name}</span>
          <span className="text-sm text-muted-foreground">
            {row.original.postalCode}
          </span>
        </div>
      );
    },
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
            status === "ACCEPTED"
              ? "default"
              : status === "PENDING" || status === "SENT"
                ? "secondary"
                : "destructive"
          }
        >
          {status.toLowerCase()}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {format(new Date(row.original.createdAt), "MMM d, yyyy")}
          </span>
          <span className="text-sm text-muted-foreground">
            {format(new Date(row.original.createdAt), "HH:mm")}
          </span>
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
              Copy lead ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit lead</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
