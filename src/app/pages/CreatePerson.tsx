import PersonForm from "@/components/forms/PersonForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPerson } from "@/lib/queries/persons";
import { Person } from "@/generated/prisma";
import { PersonWithRelations } from "@/types/family";

export default function CreatePerson({
  onSuccess,
  defaultValues,
}: {
  onSuccess: () => void;
  defaultValues?: Partial<PersonWithRelations>;
}) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (formData: Partial<Person>) => createPerson(formData),
    onSuccess: (newPerson) => {
      queryClient.setQueryData(["members", newPerson.id], newPerson);
      queryClient.invalidateQueries({ queryKey: ["members"] });
      onSuccess();
    },
  });

  return (
    <>
      <PersonForm
        onSubmit={(data) => createMutation.mutate(data)}
        onDelete={() => null}
        defaultValues={defaultValues}
        title="إضافة فرد"
      />
    </>
  );
}
