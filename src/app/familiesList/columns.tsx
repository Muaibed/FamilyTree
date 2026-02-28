"use client";

import { Button } from "@/components/ui/button";
import { FamilyWithRootPerson } from "@/types/family";
import { ColumnDef } from "@tanstack/react-table";

export function columns({
  onEdit,
}: {
  onEdit: (family: FamilyWithRootPerson) => void;
}): ColumnDef<FamilyWithRootPerson>[] {
  return [
    {
      accessorKey: "name",
      header: "الاسم",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const family = row.original;
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
