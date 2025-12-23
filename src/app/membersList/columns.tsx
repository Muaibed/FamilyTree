"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PersonWithRelations } from "@/types/family";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function columns({
  onEdit,
}: {
  onEdit: (person: PersonWithRelations) => void;
}): ColumnDef<PersonWithRelations>[] {
  return [
    {
      accessorKey: "firstName",
      header: "الاسم",
    },
    {
      accessorKey: "fullName",
      header: "الاسم الكامل",
    },
    {
      accessorKey: "family.name",
      header: "العائلة",
    },
    {
      accessorKey: "gender",
      header: "الجنس",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const person = row.original;
        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => onEdit(person)}
          >
            تعديل
          </Button>
        );
      },
    },
  ];
}
