import FamilyTreeForm from "@/components/forms/FamilyTreeForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFamilyTree } from "@/lib/queries/familyTrees";
import { FamilyTree } from "@/generated/prisma";

export default function CreateFamilyTree({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (formData: Partial<FamilyTree> & { groupId?: string | null }) =>
      createFamilyTree({
        name: formData.name!,
        description: formData.description ?? undefined,
        rootPersonId: formData.rootPersonId!,
        groupId: formData.groupId ?? undefined,
      }),
    onSuccess: (newTree) => {
      queryClient.setQueryData(["family-tree", newTree.id], newTree);
      queryClient.invalidateQueries({ queryKey: ["owner-family-trees"] });
      onSuccess();
    },
  });

  return (
    <>
      <FamilyTreeForm
        onSubmit={(data) => createMutation.mutate(data)}
        onDelete={() => null}
        title="إضافة شجرة عائلية"
      />
    </>
  );
}
