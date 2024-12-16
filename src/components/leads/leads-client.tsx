"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns, Lead } from "./tables/columns";

interface LeadsClientProps {
  data: Lead[];
}

export function LeadsClient({ data }: LeadsClientProps) {
  return <DataTable columns={columns} data={data} />;
}
