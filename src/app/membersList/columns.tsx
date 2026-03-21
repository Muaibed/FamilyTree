"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PersonWithRelations } from "@/types/family";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type PersonRow = PersonWithRelations & { canEdit?: boolean };

export function columns({
  onEdit,
}: {
  onEdit: (person: PersonRow) => void;
}): ColumnDef<PersonRow>[] {
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
        if (!person.canEdit) return null;
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
