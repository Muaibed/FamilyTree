"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SpouseRelationship } from "@/generated/prisma";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function columns({
  onEdit,
}: {
  onEdit: (relation: SpouseRelationship) => void;
}): ColumnDef<SpouseRelationship>[] {
  return [
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
    {
      id: "actions",
      cell: ({ row }) => {
        const relation = row.original;
        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:cursor-pointer"
            onClick={() => onEdit(relation)}
          >
            Edit
          </Button>
        );
      },
    },
  ];
}
