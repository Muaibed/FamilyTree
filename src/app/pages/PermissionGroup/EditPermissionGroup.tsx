import { PermissionGroupForm } from "@/components/forms/PermissionGroupForm";
import {
  PermissionGroup,
  PermissionGroupFamilyEntry,
} from "@/generated/prisma";
import {
  useGroup,
  useUpdatePermissionGroup,
} from "@/hooks/useGroup";
import { toast } from "sonner";

export default function EditPermissionGroup({
  groupId,
  permGroupId,
  onSuccess,
}: {
  groupId: string;
  permGroupId: string;
  onSuccess: () => void;
}) {
  const { data: group } = useGroup(groupId);
  const { mutateAsync: updatePermGroup } = useUpdatePermissionGroup(groupId);

  const permGroup = group?.permissionGroups?.find(
    (pg: PermissionGroup) => pg.id === permGroupId,
  );

  if (!permGroup) return null;

  const groupPermissions = permGroup.groupPermissions.map(
    (p: PermissionGroupFamilyEntry) => p.permission,
  );
  const familyPermissions = permGroup.familyPermissions.map(
    (p: PermissionGroupFamilyEntry) => p.permission,
  );
  const treePermissions = permGroup.treePermissions.map(
    (p: PermissionGroupFamilyEntry) => p.permission,
  );

  const handleSubmit = async (formData: Partial<PermissionGroupForm> & { groupId?: string | null }) => {
    try {
      await updatePermGroup({
        pgId: permGroupId,
        data: {
          name: formData.name!.trim(),
          groupPermissions: formData.groupPermissions,
          familyPermissions: formData.familyPermissions,
          treePermissions: formData.treePermissions,
        },
      });
      onSuccess();
      toast("تم تعديل مجموعة الصلاحيات.");
    } catch {
      toast("فشل تعديل مجموعة الصلاحيات.");
    }
  };

  return (
    <PermissionGroupForm
      key={`${permGroupId}-${JSON.stringify(groupPermissions)}-${JSON.stringify(familyPermissions)}-${JSON.stringify(treePermissions)}`}
      onSubmit={handleSubmit}
      defaultValues={{
        name: permGroup.name,
        groupPermissions,
        familyPermissions,
        treePermissions,
      }}
    />
  );
}