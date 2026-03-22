import PersonForm from "@/components/forms/PersonForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpouseRelationship } from "@/generated/prisma";
import { SpouseRelationshipWithPartners } from "@/types/family";
import { createSpouseRelationship } from "@/lib/queries/spouseRelationships";
import SpouseForm from "@/components/forms/SpouseForm";

export default function CreateSpouseRelationship({
  onSuccess,
  defaultValues,
}: {
  onSuccess: () => void;
  defaultValues?: Partial<SpouseRelationshipWithPartners>;
}) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (formData: Partial<SpouseRelationship>) => createSpouseRelationship(formData),
    onSuccess: (newRelation) => {
      queryClient.setQueryData(["relations", newRelation.id], newRelation);
      queryClient.invalidateQueries({ queryKey: ["relations"] });
      onSuccess();
    },
  });

  return (
    <>
      <SpouseForm
        onSubmit={(data) => createMutation.mutate(data)}
        defaultValues={defaultValues}
        title="إضافة زوج"
        gender={defaultValues?.maleId ? "FEMALE" : defaultValues?.femaleId ? "MALE" : undefined}
      />
    </>
  );
}
