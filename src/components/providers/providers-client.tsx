"use client";

import { DataTable } from "./tables/data-table";
import { columns } from "./tables/columns";
import { Provider } from "./tables/columns";

interface ProvidersClientProps {
  data: Provider[];
}

export function ProvidersClient({ data }: ProvidersClientProps) {
  return <DataTable columns={columns} data={data} />;
}
