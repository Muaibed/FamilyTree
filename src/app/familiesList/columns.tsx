"use client";

import { Button } from "@/components/ui/button";
import { FamilyWithRootPerson } from "@/types/family";
import { ColumnDef } from "@tanstack/react-table";

type FamilyRow = FamilyWithRootPerson & { canEdit?: boolean };

export function columns({
  onEdit,
}: {
  onEdit: (family: FamilyRow) => void;
}): ColumnDef<FamilyRow>[] {
  return [
    {
      accessorKey: "name",
      header: "الاسم",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const family = row.original;
        if (!family.canEdit) return null;
        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => onEdit(family)}
          >
            تعديل
          </Button>
        );
      },
    },
  ];
}
