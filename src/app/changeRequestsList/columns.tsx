"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Family } from "@/types/family";
import { ChangeRequest } from "@/generated/prisma";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function columns({
  showDetails,
}: {
  showDetails: (request: ChangeRequest) => void;
}): ColumnDef<ChangeRequest>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "targetModel",
      header: "Target Model",
    },
    {
      accessorKey: "targetId",
      header: "Target ID",
    },
    {
      accessorKey: "action",
      header: "Action",
    },
    {
      accessorKey: "requesterName",
      header: "Requester Name",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:cursor-pointer"
            onClick={() => showDetails(request)}
          >
            Details
          </Button>
        );
      },
    },
  ];
}
