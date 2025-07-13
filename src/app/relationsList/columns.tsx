"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SpouseRelationship } from "@/generated/prisma";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function columns(): ColumnDef<SpouseRelationship>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: "male.fullName",
      header: "Male",
    },
    {
      accessorKey: "female.fullName",
      header: "Female",
    },
    {
      accessorKey: "isActive",
      header: "isActive",
    },
  ];
}
