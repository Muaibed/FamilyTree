import FamilyTreeForm from "@/components/forms/FamilyTreeForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFamilyTree,
  updateFamilyTree,
  removeCollapsedBranch,
} from "@/lib/queries/familyTrees";
import { FamilyTree } from "@/generated/prisma";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";

export default function EditFamilyTree({
  id,
  onSubmit,
  onDelete,
}: {
  id: string;
  onSubmit: () => void;
  onDelete: () => void;
}) {
  const queryClient = useQueryClient();

  const {
    data: tree,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["family-tree", id],
    queryFn: () => getFamilyTree(id),
  });

  const updateMutation = useMutation({
    mutationFn: (formData: Partial<FamilyTree> & { groupId?: string | null }) =>
      updateFamilyTree(id, {
        name: formData.name,
        description: formData.description ?? undefined,
        rootPersonId: formData.rootPersonId ?? undefined,
        groupId: formData.groupId !== undefined ? formData.groupId : undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-tree", id] });
      queryClient.invalidateQueries({ queryKey: ["owner-family-trees"] });
      onSubmit();
    },
  });

  const expandMutation = useMutation({
    mutationFn: (personId: string) => removeCollapsedBranch(id, personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-tree", id] });
    },
  });

  if (isLoading) return <Loader2 />;
  if (isError || !tree) return <ErrorAlert />;

  return (
    <>
      <FamilyTreeForm
        key={`${tree.id}-${tree.groupId ?? ''}`}
        onSubmit={(data) => {
          updateMutation.mutate(data);
        }}
        onDelete={() => onDelete()}
        defaultValues={tree}
        title="تعديل الشجرة العائلية"
      />
      {tree.collapsedBranches.length > 0 && (
        <div className="max-w-md mx-auto px-6 pb-6">
          <h3 className="text-lg font-semibold mb-2 text-right">الفروع المخفية</h3>
          <div className="flex flex-col gap-2">
            {tree.collapsedBranches.map((branch) => (
              <div
                key={branch.personId}
                className="flex items-center justify-between border rounded p-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => expandMutation.mutate(branch.personId)}
                >
                  إظهار
                </Button>
                <span className="text-right">{branch.person.firstName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
