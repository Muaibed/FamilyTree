"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Family } from "@/types/family";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function columns({
  onEdit,
}: {
  onEdit: (family: Family) => void;
}): ColumnDef<Family>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "rootPersonId",
      header: "Root",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const family = row.original;
        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:cursor-pointer"
            onClick={() => onEdit(family)}
          >
            Edit
          </Button>
        );
      },
    },
  ];
}
