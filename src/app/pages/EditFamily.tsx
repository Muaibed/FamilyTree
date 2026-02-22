import FamilyForm from "@/components/forms/FamilyForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFamily, updateFamily } from "@/lib/queries/families";
import { Family } from "@/generated/prisma";
import { Loader2 } from "lucide-react";
import ErrorPage from "@/components/alerts/ErrorAlert";

export default function EditFamily({
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
    data: family,
    isLoading: familyLoading,
    isError: familyError,
  } = useQuery({
    queryKey: ["family", id],
    queryFn: () => getFamily(id),
  });

  const updateMutation = useMutation({
    mutationFn: (formData: Family) => updateFamily(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family", id] });
      queryClient.invalidateQueries({ queryKey: ["families"] });
    },
  });

  if (familyLoading) return <Loader2 />;
  if (familyError || !family) return <ErrorPage />;

  return (
    <>
      <FamilyForm
        onSubmit={(data) => {
          updateMutation.mutate(data as Family);
          onSubmit();
        }}
        onDelete={() => onDelete()}
        defaultValues={family}
        title="تعديل معلومات العائلة"
      />
    </>
  );
}
