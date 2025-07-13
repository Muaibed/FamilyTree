"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SpouseRelationshipWithPartners } from "@/types/family";

export function FamilyTableClient({ data }: { data: SpouseRelationshipWithPartners[] }) {
  return <DataTable columns={columns()} data={Object.values(data)} />;
}
