import FamilyForm from "@/components/forms/FamilyForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFamily } from "@/lib/queries/families";
import { FamilyWithRootPerson } from "@/types/family";
import { Family } from "@/generated/prisma";

export default function CreateFamily({
  onSuccess,
  defaultValues,
}: {
  onSuccess: () => void;
  defaultValues?: Partial<FamilyWithRootPerson>;
}) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: { name: string; groupId?: string | null }) => createFamily({ name: data.name, groupId: data.groupId ?? undefined }),
    onSuccess: (newFamily) => {
      queryClient.setQueryData(["families", newFamily.id], newFamily);
      queryClient.invalidateQueries({ queryKey: ["families"] });
      onSuccess();
    },
  });

  return (
    <>
      <FamilyForm
        onSubmit={(data) => createMutation.mutate({ name: (data as Partial<Family>).name!, groupId: data.groupId ?? undefined })}
        onDelete={() => null}
        defaultValues={defaultValues}
        title="إضافة عائلة"
      />
    </>
  );
}
