import PersonForm from "@/components/forms/PersonForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPerson, updatePerson } from "@/lib/queries/persons";
import { Person } from "@/generated/prisma";
import { Loader2 } from "lucide-react";
import ErrorPage from "@/components/alerts/ErrorAlert";

export default function EditPerson({ id, onSubmit, onDelete }: {id: string, onSubmit: () => void, onDelete: () => void}) {
  const queryClient = useQueryClient();

  const { data: person, isLoading: personLoading, isError: personError } = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(id),
  });

  const updateMutation = useMutation({
    mutationFn: (formData: Partial<Person>) => updatePerson(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["person", id] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["family-tree"] });
      onSubmit();
    },
  });

  if (personLoading) return <Loader2 />
  if (personError || !person) return <ErrorPage />

  return (
    <>
        <PersonForm onSubmit={(data) => {
            updateMutation.mutate(data);
          }}
          onDelete={() => onDelete()} 
          defaultValues={person} 
          title="تعديل معلومات فرد"
        />
    </>
  );
}