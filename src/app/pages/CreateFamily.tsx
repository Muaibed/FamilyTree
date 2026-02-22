import FamilyForm from "@/components/forms/FamilyForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFamily } from "@/lib/queries/families";
import { Family } from "@/generated/prisma";
import { FamilyWithRootPerson } from "@/types/family";

export default function CreateFamily({
  onSuccess,
  defaultValues,
}: {
  onSuccess: () => void;
  defaultValues?: Partial<FamilyWithRootPerson>;
}) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (formData: Family) => createFamily(formData),
    onSuccess: (newFamily) => {
      queryClient.setQueryData(["families", newFamily.id], newFamily);
      queryClient.invalidateQueries({ queryKey: ["families"] });
      onSuccess();
    },
  });

  return (
    <>
      <FamilyForm
        onSubmit={(data) => createMutation.mutate(data as Family)}
        onDelete={() => null}
        defaultValues={defaultValues}
        title="إضافة عائلة"
      />
    </>
  );
}
