import SpouseForm from "@/components/forms/SpouseForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSpouseRelationship, updateSpouseRelationship, deleteSpouseRelationship } from "@/lib/queries/spouseRelationships";
import { SpouseRelationship } from "@/generated/prisma";
import { Loader2 } from "lucide-react";
import ErrorPage from "@/components/alerts/ErrorAlert";

export default function EditSpouseRelationship({
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
    data: relation,
    isLoading: relationLoading,
    isError: relationError,
  } = useQuery({
    queryKey: ["relation", id],
    queryFn: () => getSpouseRelationship(id),
  });

  const updateMutation = useMutation({
    mutationFn: (formData: SpouseRelationship) =>
      updateSpouseRelationship(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relation", id] });
      queryClient.invalidateQueries({ queryKey: ["relations"] });
      onSubmit();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteSpouseRelationship({ maleId: relation?.maleId, femaleId: relation?.femaleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relations"] });
      onDelete();
    },
  });

  if (relationLoading) return <Loader2 />;
  if (relationError || !relation) return <ErrorPage />;

  return (
    <>
      <SpouseForm
        onSubmit={(data) => {
          updateMutation.mutate(data as SpouseRelationship);
        }}
        onDelete={() => deleteMutation.mutate()}
        defaultValues={relation}
        title="تعديل معلومات الزوجية"
        gender={relation.maleId ? "FEMALE" : "MALE"}
      />
    </>
  );
}
