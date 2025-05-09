"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Person } from "../types/family"
import { PersonModal } from "../components/client/Modal"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function columns({ onEdit }: { onEdit: (person:Person) => void }): ColumnDef<Person>[] {
  return [
      {
        accessorKey: "name",
        header: "First Name",
      },
      {
        accessorKey: "familyName",
        header: "Family Name",
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const person = row.original
          return (
            <Button variant="ghost" className="h-8 w-8 p-0 hover:cursor-pointer" onClick={() => onEdit(person)}>
                Edit
            </Button>
          )
        },
      },
  ]
}
