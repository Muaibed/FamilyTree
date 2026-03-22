"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Modal } from "@/components/client/Modal";
import EditFamilyTree from "@/app/pages/FamilyTree/EditFamilyTree";
import CreateFamilyTree from "@/app/pages/FamilyTree/CreateFamilyTree";
import { FamilyTreeWithDetails } from "@/types/family";
import { Button } from "@/components/ui/button";

type TreeRow = FamilyTreeWithDetails & {
  canEdit?: boolean;
  canDelete?: boolean;
};

export function FamilyTreeTableClient({ data }: { data: TreeRow[] }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedTree, setSelectedTree] = useState<TreeRow | undefined>(
    undefined,
  );
  const [isCreating, setIsCreating] = useState(false);

  const tableColumns = columns({
    onEdit: (tree) => setSelectedTree(tree),
    onView: (tree) => router.push(`/tree/${tree.id}`),
  });

  return (
    <>
      <DataTable
        columns={tableColumns}
        data={data}
        action={<Button onClick={() => setIsCreating(true)}>إضافة</Button>}
      />
      {selectedTree && (
        <Modal isOpen={true} onClose={() => setSelectedTree(undefined)}>
          <EditFamilyTree
            id={selectedTree.id}
            onSubmit={() => {
              queryClient.invalidateQueries({
                queryKey: ["owner-family-trees"],
              });
              setSelectedTree(undefined);
            }}
            onDelete={() => {
              queryClient.invalidateQueries({ queryKey: ["owner-family-trees"] });
              setSelectedTree(undefined);
            }}
          />
        </Modal>
      )}
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)}>
        <CreateFamilyTree
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["owner-family-trees"] });
            setIsCreating(false);
          }}
        />
      </Modal>
    </>
  );
}
