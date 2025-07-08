"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SpouseRelationship } from "../../types/family";

export function FamilyTableClient({ data }: { data: SpouseRelationship[] }) {
  return <DataTable columns={columns()} data={Object.values(data)} />;
}
