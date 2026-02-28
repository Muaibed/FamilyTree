"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOwnerFamilyTrees } from "@/lib/queries/familyTrees";
import { FamilyTreeWithDetails } from "@/types/family";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Modal } from "@/components/client/Modal";
import EditFamilyTree from "@/app/pages/EditFamilyTree";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FamilyTreeListPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedTree, setSelectedTree] = useState<
    FamilyTreeWithDetails | undefined
  >(undefined);

  const {
    data: trees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["owner-family-trees"],
    queryFn: getOwnerFamilyTrees,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 />
      </div>
    );

  if (isError)
    return (
      <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات" />
    );

  return (
    <div className="container mx-auto py-10" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">أشجار العائلة</h1>
      {trees.length === 0 ? (
        <p className="text-muted-foreground">لا توجد أشجار عائلية بعد.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {trees.map((tree) => (
            <div
              key={tree.id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTree(tree)}
                >
                  تعديل
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push(`/tree/${tree.id}`)}
                >
                  عرض
                </Button>
              </div>
              <div className="text-right">
                <p className="font-semibold">{tree.name}</p>
                {tree.description && (
                  <p className="text-sm text-muted-foreground">
                    {tree.description}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  الجد الأكبر: {tree.rootPerson.firstName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

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
            onDelete={() => setSelectedTree(undefined)}
          />
        </Modal>
      )}
    </div>
  );
}
