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
      header: "First Name",
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
    },
    {
      accessorKey: "family.name",
      header: "Family Name",
    },
    {
      accessorKey: "gender",
      header: "Gender",
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
            Edit
          </Button>
        );
      },
    },
  ];
}
