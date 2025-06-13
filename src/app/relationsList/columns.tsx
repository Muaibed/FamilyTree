"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { SpouseRelationship } from "../../types/family";
import { PersonModal } from "../../components/client/Modal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function columns(): ColumnDef<SpouseRelationship>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: "person",
      header: "Person",
    },
    {
      accessorKey: "spouse",
      header: "Spouse",
    },
    {
      accessorKey: "isActive",
      header: "isActive",
    },
  ];
}
