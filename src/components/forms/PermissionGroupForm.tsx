import { toast } from "sonner";
import { Input } from "../ui/input";
import { Family, FamilyPermission, GroupPermission, TreePermission } from "@/generated/prisma";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useCreatePermissionGroup } from "@/hooks/useGroup";
import { Button } from "../ui/button";

const GROUP_PERMS: { value: GroupPermission; label: string }[] = [
  { value: 'ADD_FAMILY', label: 'إضافة عائلة' },
  { value: 'ADD_FAMILY_TREE', label: 'إضافة شجرة عائلية' },
];

const FAMILY_PERMS: { value: FamilyPermission; label: string }[] = [
  { value: 'EDIT_FAMILY', label: 'تعديل العائلة' },
  { value: 'DELETE_FAMILY', label: 'حذف العائلة' },
  { value: 'ADD_PERSON', label: 'إضافة فرد' },
  { value: 'EDIT_PERSON', label: 'تعديل فرد' },
  { value: 'DELETE_PERSON', label: 'حذف فرد' },
  { value: 'ADD_SPOUSE', label: 'إضافة زوج/زوجة' },
  { value: 'EDIT_SPOUSE', label: 'تعديل علاقة زوجية' },
  { value: 'DELETE_SPOUSE', label: 'حذف علاقة زوجية' },
];

const TREE_PERMS: { value: TreePermission; label: string }[] = [
  { value: 'EDIT_TREE', label: 'تعديل إعدادات الشجرة' },
  { value: 'DELETE_TREE', label: 'حذف الشجرة' },
  { value: 'COLLAPSE_BRANCHES', label: 'طي الفروع' },
  { value: 'SET_COLORS', label: 'تعيين الألوان' },
];

export type PermissionGroupForm = {
    name: string,
    groupPermissions: GroupPermission[],
    familyPermissions: FamilyPermission[],
    treePermissions: TreePermission[],
};

export function PermissionGroupForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (permissionGroup: PermissionGroupForm) => void;
  defaultValues?: Partial<PermissionGroupForm>;
}) {

  const [newPermGroupName, setNewPermGroupName] = useState(defaultValues?.name ?? '');
  const [newPermGroupGroupPerms, setNewPermGroupGroupPerms] = useState<GroupPermission[]>(defaultValues?.groupPermissions ?? []);
  const [newPermGroupFamilyPerms, setNewPermGroupFamilyPerms] = useState<FamilyPermission[]>(defaultValues?.familyPermissions ?? []);
  const [newPermGroupTreePerms, setNewPermGroupTreePerms] = useState<TreePermission[]>(defaultValues?.treePermissions ?? []);
  const [saving, setSaving] = useState(false);

  const { data: session } = useSession();

  const toggle = <T extends string>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const handleSave = async () => {
    if (!newPermGroupName.trim()) return;
    try {
      const permissionGroup: PermissionGroupForm = {
        name: newPermGroupName.trim(),
        groupPermissions: newPermGroupGroupPerms,
        familyPermissions: newPermGroupFamilyPerms,
        treePermissions: newPermGroupTreePerms,
      };
      onSubmit(permissionGroup)
    } catch {
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto space-y-4" dir="rtl">
          <h2 className="text-xl font-semibold">إنشاء مجموعة صلاحيات</h2>
          <Input
            value={newPermGroupName}
            onChange={(e) => setNewPermGroupName(e.target.value)}
            placeholder="اسم مجموعة الصلاحيات"
            dir="rtl"
          />

          <div>
            <h3 className="font-medium mb-2">صلاحيات المجموعة</h3>
            <div className="flex flex-col gap-1">
              {GROUP_PERMS.map((p) => (
                <label key={p.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPermGroupGroupPerms.includes(p.value)}
                    onChange={() => setNewPermGroupGroupPerms(toggle(newPermGroupGroupPerms, p.value))}
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">صلاحيات العائلة</h3>
            <div className="flex flex-col gap-1">
              {FAMILY_PERMS.map((p) => (
                <label key={p.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPermGroupFamilyPerms.includes(p.value)}
                    onChange={() => setNewPermGroupFamilyPerms(toggle(newPermGroupFamilyPerms, p.value))}
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">صلاحيات الشجرة</h3>
            <div className="flex flex-col gap-1">
              {TREE_PERMS.map((p) => (
                <label key={p.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPermGroupTreePerms.includes(p.value)}
                    onChange={() => setNewPermGroupTreePerms(toggle(newPermGroupTreePerms, p.value))}
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={handleSave}>حفظ</Button>
        </div>
  );
}