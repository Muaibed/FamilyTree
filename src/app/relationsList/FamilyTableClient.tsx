// FamilyTableClient.tsx (Client Component)
"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Modal } from "../../components/client/Modal";
import { FamilyTreeData, Person, SpouseRelationship } from "../../types/family";
import EditPersonForm from "../../components/client/EditPersonForm";

export function FamilyTableClient({ data }: { data: SpouseRelationship[] }) {
  return (
      <DataTable columns={columns()} data={Object.values(data)} />
  );
}