"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SpouseRelationship } from "@/generated/prisma";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type RelationRow = SpouseRelationship & { canEdit?: boolean };

export function columns({
  onEdit,
}: {
  onEdit: (relation: RelationRow) => void;
}): ColumnDef<RelationRow>[] {
  return [
    {
      accessorKey: "male.fullName",
      header: "الزوج",
    },
    {
      accessorKey: "female.fullName",
      header: "الزوجة",
    },
    {
      accessorKey: "isActive",
      header: "مستمر",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const relation = row.original;
        if (!relation.canEdit) return null;
        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:cursor-pointer"
            onClick={() => onEdit(relation)}
          >
            تعديل
          </Button>
        );
      },
    },
  ];
}
