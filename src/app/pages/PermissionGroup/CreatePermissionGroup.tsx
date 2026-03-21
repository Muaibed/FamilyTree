import { Member } from "@/app/groups/[id]/page";
import { PermissionGroupForm } from "@/components/forms/PermissionGroupForm";
import { Family, PermissionGroup } from "@/generated/prisma";
import { useCreatePermissionGroup, useGroup } from "@/hooks/useGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function CreatePermissionGroup({
  id,
  onSuccess,
  onClose,
}: {
  id: string;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const {
    data: group,
    isLoading: groupLoading,
    isError: groupError,
  } = useGroup(id);
  const families: Family[] = group?.families ?? [];
  const trees: { id: string; name: string }[] = group?.familyTrees ?? [];

  const { mutateAsync: createPermGroup } = useCreatePermissionGroup(id);

  const createMutation = useMutation({
    mutationFn: (
      formData: Partial<PermissionGroupForm> & { groupId?: string | null },
    ) =>
      createPermGroup({
        name: formData.name!.trim(),
        groupPermissions: formData.groupPermissions,
        familyPermissions: formData.familyPermissions,
        treePermissions: formData.treePermissions,
      }),
    onSuccess: (newPermGroup) => {
      queryClient.setQueryData(["perm-groups", newPermGroup.id], newPermGroup);
      queryClient.invalidateQueries({ queryKey: ["perm-groups"] });
      onSuccess();
      toast("تم إنشاء مجموعة الصلاحيات.");
    },
    onError: () => {
      toast("فشل إنشاء مجموعة الصلاحيات.");
    },
  });

  return (
    <>
      <PermissionGroupForm
        onSubmit={(data) => createMutation.mutate(data)}
      />
    </>
  );
}
