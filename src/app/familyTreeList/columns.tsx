"use client";

import { Button } from "@/components/ui/button";
import { FamilyTreeWithDetails } from "@/types/family";
import { ColumnDef } from "@tanstack/react-table";

type TreeRow = FamilyTreeWithDetails & { canEdit?: boolean; canDelete?: boolean };

export function columns({
  onEdit,
  onView,
}: {
  onEdit: (tree: TreeRow) => void;
  onView: (tree: TreeRow) => void;
}): ColumnDef<TreeRow>[] {
  return [
    {
      accessorKey: "name",
      header: "الاسم",
    },
    {
      accessorKey: "description",
      header: "الوصف",
      cell: ({ row }) => row.original.description ?? "—",
    },
    {
      accessorKey: "rootPerson.firstName",
      header: "الجد الأكبر",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const tree = row.original;
        return (
          <div className="flex gap-2 justify-end">
            {tree.canEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(tree)}>
                تعديل
              </Button>
            )}
            <Button size="sm" onClick={() => onView(tree)}>
              عرض
            </Button>
          </div>
        );
      },
    },
  ];
}
