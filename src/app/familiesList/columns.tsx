"use client";

import { Button } from "@/components/ui/button";
import { FamilyWithRootPerson } from "@/types/family";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
      accessorKey: "rootPerson.fullName",
      header: "جذر العائلة",
    },
    {
      accessorKey: "isDisplayed",
      header: "أُنشئت لهذه العائلة شجرة",
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
