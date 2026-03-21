"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/client/Modal";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import {
  useGroup,
  useGroupMembers,
  useInviteMember,
  useRemoveMember,
  useSetMemberAdmin,
  useSetMemberGroupPermissions,
  useSetMemberFamilyPermissions,
  useSetMemberTreePermissions,
  usePermissionGroups,
  useActivityLog,
  useAssignPermissionGroup,
  useRemovePermissionGroupAssignment,
} from "@/hooks/useGroup";
import {
  Family,
  FamilyPermission,
  GroupPermission,
  TreePermission,
} from "@/generated/prisma";
import CreatePermissionGroup from "@/app/pages/PermissionGroup/CreatePermissionGroup";
import EditPermissionGroup from "@/app/pages/PermissionGroup/EditPermissionGroup";

export type Member = {
  id: string;
  isAdmin: boolean;
  inviteStatus: string;
  user: { id: string; name: string | null; email: string };
  groupPermissions: { permission: GroupPermission }[];
  familyPermissions: { familyId: string; permission: FamilyPermission }[];
  treePermissions: { treeId: string; permission: TreePermission }[];
  permissionGroupAssignments: {
    id: string;
    permissionGroup: { id: string; name: string };
    familyScopes: { familyId: string }[];
    treeScopes: { treeId: string }[];
  }[];
};

type PermGroup = { id: string; name: string };

const GROUP_PERMS: { value: GroupPermission; label: string }[] = [
  { value: "ADD_FAMILY", label: "إضافة عائلة" },
  { value: "ADD_FAMILY_TREE", label: "إضافة شجرة عائلية" },
];

const FAMILY_PERMS: { value: FamilyPermission; label: string }[] = [
  { value: "EDIT_FAMILY", label: "تعديل العائلة" },
  { value: "DELETE_FAMILY", label: "حذف العائلة" },
  { value: "ADD_PERSON", label: "إضافة فرد" },
  { value: "EDIT_PERSON", label: "تعديل فرد" },
  { value: "DELETE_PERSON", label: "حذف فرد" },
  { value: "ADD_SPOUSE", label: "إضافة زوج/زوجة" },
  { value: "EDIT_SPOUSE", label: "تعديل علاقة زوجية" },
  { value: "DELETE_SPOUSE", label: "حذف علاقة زوجية" },
];

const TREE_PERMS: { value: TreePermission; label: string }[] = [
  { value: "EDIT_TREE", label: "تعديل إعدادات الشجرة" },
  { value: "DELETE_TREE", label: "حذف الشجرة" },
  { value: "COLLAPSE_BRANCHES", label: "طي الفروع" },
  { value: "SET_COLORS", label: "تعيين الألوان" },
];

function AssignPermGroupRow({
  available,
  onAssign,
}: {
  available: PermGroup[];
  onAssign: (pgId: string) => Promise<void>;
}) {
  const [selected, setSelected] = useState(available[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex gap-2 items-center">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="flex-1 border rounded-md p-2 bg-background text-sm"
        dir="rtl"
      >
        {available.map((pg) => (
          <option key={pg.id} value={pg.id}>{pg.name}</option>
        ))}
      </select>
      <Button
        size="sm"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await onAssign(selected);
          setLoading(false);
        }}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "تعيين"}
      </Button>
    </div>
  );
}

function PermissionsModal({
  groupId,
  member,
  families,
  trees,
  permGroups,
  onClose,
}: {
  groupId: string;
  member: Member;
  families: Family[];
  trees: { id: string; name: string }[];
  permGroups: PermGroup[];
  onClose: () => void;
}) {
  const { mutateAsync: setGroupPerms } = useSetMemberGroupPermissions(groupId);
  const { mutateAsync: setFamilyPerms } = useSetMemberFamilyPermissions(groupId);
  const { mutateAsync: setTreePerms } = useSetMemberTreePermissions(groupId);
  const { mutateAsync: assignPermGroup } = useAssignPermissionGroup(groupId);
  const { mutateAsync: removePermGroupAssignment } = useRemovePermissionGroupAssignment(groupId);
  
  const [groupPermsSel, setGroupPermsSel] = useState<GroupPermission[]>(
    member.groupPermissions?.map((p) => p.permission) ?? [],
  );
  const [selectedFamilyId, setSelectedFamilyId] = useState(
    families[0]?.id ?? "",
  );
  const [familyPermsSel, setFamilyPermsSel] = useState<FamilyPermission[]>(member.familyPermissions?.filter((f) => f.familyId === selectedFamilyId).map((p) => p.permission) ?? []);
  const [selectedTree, setSelectedTree] = useState(trees[0]?.id ?? "");
  const [treePermsSel, setTreePermsSel] = useState<TreePermission[]>(
    member.treePermissions?.filter((t) => t.treeId === (trees[0]?.id ?? "")).map((p) => p.permission) ?? []
  );
  const [saving, setSaving] = useState(false);
  
  const { data: session } = useSession();
  const selectedFamily = useMemo(() => {
    return families.find((f) => f.id === selectedFamilyId);
  }, [selectedFamilyId, families]);

  const toggle = <T extends string>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const handleSave = async () => {
    setSaving(true);
    try {
      await setGroupPerms({ memberId: member.id, permissions: groupPermsSel });
      if (selectedFamily) {
        await setFamilyPerms({
          memberId: member.id,
          familyId: selectedFamilyId,
          permissions: familyPermsSel,
        });
      }
      if (selectedTree) {
        await setTreePerms({
          memberId: member.id,
          treeId: selectedTree,
          permissions: treePermsSel,
        });
      }
      toast("تم حفظ الصلاحيات.");
      onClose();
    } catch {
      toast("فشل حفظ الصلاحيات.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6 max-h-[80vh] overflow-y-auto" dir="rtl">
      <h2 className="text-xl font-semibold">
        صلاحيات {member.user.name ?? member.user.email}
      </h2>

      {/* Group-level permissions */}
      <div>
        <h3 className="font-medium mb-2">صلاحيات المجموعة</h3>
        <div className="flex flex-col gap-1">
          {GROUP_PERMS.map((p) => (
            <label
              key={p.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={groupPermsSel.includes(p.value)}
                onChange={() =>
                  setGroupPermsSel(toggle(groupPermsSel, p.value))
                }
              />
              {p.label}
            </label>
          ))}
        </div>
      </div>

      {/* Family-level permissions */}
      {families.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">صلاحيات العائلة</h3>
          <select
            value={selectedFamilyId}
            onChange={(e) => {
              const newFamilyId = e.target.value;
              setSelectedFamilyId(newFamilyId);
              setFamilyPermsSel(
                member.familyPermissions
                  ?.filter((f) => f.familyId === newFamilyId)
                  .map((p) => p.permission) ?? []
              );
            }}
            className="w-full border rounded-md p-2 bg-background text-sm mb-2"
            dir="rtl"
          >
            {families.map((f) => {
              return (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              );
            })}
          </select>

          {selectedFamily?.creatorId === member.user.id ? (
            <div className="flex gap-2">
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                مشرف
              </span>
              <p className="text-xs text-muted-foreground">
                لديه جميع الصلاحيات لهذه العائلة
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {FAMILY_PERMS.map((p) => (
                <label
                  key={p.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={familyPermsSel.includes(p.value)}
                    onChange={() =>
                      setFamilyPermsSel(toggle(familyPermsSel, p.value))
                    }
                  />
                  {p.label}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tree-level permissions */}
      {trees.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">صلاحيات الشجرة</h3>
          <select
            value={selectedTree}
            onChange={(e) => {
              const newTreeId = e.target.value;
              setSelectedTree(newTreeId);
              setTreePermsSel(
                member.treePermissions
                  ?.filter((t) => t.treeId === newTreeId)
                  .map((p) => p.permission) ?? []
              );
            }}
            className="w-full border rounded-md p-2 bg-background text-sm mb-2"
            dir="rtl"
          >
            {trees.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-1">
            {TREE_PERMS.map((p) => (
              <label
                key={p.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={treePermsSel.includes(p.value)}
                  onChange={() =>
                    setTreePermsSel(toggle(treePermsSel, p.value))
                  }
                />
                {p.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Permission Group Assignments */}
      {permGroups.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">مجموعات الصلاحيات المُعيَّنة</h3>

          {/* Currently assigned */}
          {member.permissionGroupAssignments?.length > 0 ? (
            <div className="flex flex-col gap-1 mb-3">
              {member.permissionGroupAssignments.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between border rounded-md px-3 py-1.5 text-sm"
                >
                  <span>{a.permissionGroup.name}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      try {
                        await removePermGroupAssignment({ memberId: member.id, assignmentId: a.id });
                        toast("تم إزالة مجموعة الصلاحيات.");
                      } catch {
                        toast("فشل إزالة مجموعة الصلاحيات.");
                      }
                    }}
                  >
                    إزالة
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mb-3">لا توجد مجموعات صلاحيات مُعيَّنة.</p>
          )}

          {/* Assign new */}
          {(() => {
            const assignedIds = new Set(member.permissionGroupAssignments?.map((a) => a.permissionGroup.id));
            const available = permGroups.filter((pg) => !assignedIds.has(pg.id));
            if (available.length === 0) return null;
            return (
              <AssignPermGroupRow
                available={available}
                onAssign={async (pgId) => {
                  try {
                    await assignPermGroup({ memberId: member.id, permissionGroupId: pgId });
                    toast("تم تعيين مجموعة الصلاحيات.");
                  } catch {
                    toast("فشل تعيين مجموعة الصلاحيات.");
                  }
                }}
              />
            );
          })()}
        </div>
      )}

      <Button className="w-full" disabled={saving} onClick={handleSave}>
        {saving ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          "حفظ الصلاحيات"
        )}
      </Button>
    </div>
  );
}

export default function GroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();

  const {
    data: group,
    isLoading: groupLoading,
    isError: groupError,
  } = useGroup(id);
  const { data: members = [], isLoading: membersLoading } = useGroupMembers(id);
  const { data: permGroups = [] } = usePermissionGroups(id);
  const {
    data: activityLogs = [],
    isLoading: logsLoading,
    isError: logsError,
  } = useActivityLog(id);

  const { mutateAsync: inviteMember } = useInviteMember(id);
  const { mutateAsync: removeMember } = useRemoveMember(id);
  const { mutateAsync: setMemberAdmin } = useSetMemberAdmin(id);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [permMember, setPermMember] = useState<Member | null>(null);
  const [showPermGroupModal, setShowPermGroupModal] = useState(false);
  const [selectedPermGroup, setSelectedPermGroup] = useState<string | null>();

  const currentMember = members.find(
    (m: Member) => m.user.id === session?.user?.id,
  );
  const isAdmin = currentMember?.isAdmin ?? false;

  // Always derive the live member from the query cache so the modal reflects mutations
  const permMemberLive = permMember
    ? (members.find((m: Member) => m.id === permMember.id) ?? permMember)
    : null;

  const families: Family[] = group?.families ?? [];
  const trees: { id: string; name: string }[] = group?.familyTrees ?? [];
  const pendingInvites: Member[] = (group?.members ?? []).filter(
    (m: Member) => m.inviteStatus === "PENDING",
  );

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    try {
      await inviteMember(inviteEmail.trim());
      toast("تم إرسال الدعوة.");
      setInviteEmail("");
    } catch {
      toast("فشل إرسال الدعوة.");
    } finally {
      setInviting(false);
    }
  };

  const handleToggleAdmin = async (member: Member) => {
    try {
      await setMemberAdmin({ memberId: member.id, isAdmin: !member.isAdmin });
      toast(member.isAdmin ? "تم إلغاء صلاحيات المشرف." : "تم تعيين المشرف.");
    } catch {
      toast("فشل تعديل صلاحيات المشرف.");
    }
  };

  const handleRemove = async (member: Member) => {
    try {
      await removeMember(member.id);
      toast(
        member.inviteStatus === "PENDING"
          ? "تم إلغاء الدعوة."
          : "تم إزالة العضو.",
      );
    } catch {
      toast(
        member.inviteStatus === "PENDING"
          ? "فشل إلغاء الدعوة."
          : "فشل إزالة العضو.",
      );
    }
  };

  if (groupLoading || membersLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (groupError || !group)
    return <ErrorAlert title="خطأ" message="فشل تحميل المجموعة." />;

  return (
    <div className="container mx-auto py-10 max-w-4xl" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{group.name}</h1>
        {group.description && (
          <p className="text-muted-foreground mt-1">{group.description}</p>
        )}
      </div>

      {/* Invite Member (admin only) */}
      {isAdmin && (
        <section className="mb-8 border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">دعوة عضو جديد</h2>
          <div className="flex gap-2">
            <Input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              type="email"
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
            />
            <Button disabled={inviting} onClick={handleInvite}>
              {inviting ? <Loader2 className="animate-spin w-4 h-4" /> : "دعوة"}
            </Button>
          </div>
        </section>
      )}

      {/* Pending Invitations (admin only) */}
      {isAdmin && pendingInvites.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            الدعوات المعلقة ({pendingInvites.length})
          </h2>
          <div className="flex flex-col gap-2">
            {pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between border rounded-lg p-3 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
              >
                  <div className="text-right">
                    <p className="font-medium">
                      {invite.user.name ?? invite.user.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {invite.user.email}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/40 rounded-full">
                        في الانتظار
                    </span>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemove(invite)}
                    >
                        إلغاء الدعوة
                    </Button>
                  </div>
                </div>
            ))}
          </div>
        </section>
      )}

      {/* Members */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          الأعضاء ({members.length})
        </h2>
        <div className="flex flex-col gap-2">
          {members.map((member: Member) => (
            <div
              key={member.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div className="text-right">
                <p className="font-medium">
                  {member.user.name ?? member.user.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {member.user.email}
                </p>
                {member.isAdmin && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    مشرف
                  </span>
                )}
              </div>
              <div className="flex gap-2 items-center">
                {isAdmin && member.user.id !== session?.user?.id && (
                  <>
                  {!member.isAdmin && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPermMember(member)}
                    >
                      الصلاحيات
                    </Button>
                  )}
                    <Button
                      size="sm"
                      variant={member.isAdmin ? "default" : "outline"}
                      onClick={() => handleToggleAdmin(member)}
                    >
                      {member.isAdmin ? "إلغاء مشرف" : "تعيين مشرف"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(member)}
                    >
                      إزالة
                    </Button>
                  </>
                )}
              </div>
              
            </div>
          ))}
        </div>
      </section>

      {/* Families */}
      {families.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            العائلات ({families.length})
          </h2>
          <div className="flex flex-col gap-2">
            {families.map((family) => (
              <div key={family.id} className="border rounded-lg p-3 text-right">
                <p className="font-medium">{family.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trees */}
      {trees.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            أشجار العائلة ({trees.length})
          </h2>
          <div className="flex flex-col gap-2">
            {trees.map((tree) => (
              <div key={tree.id} className="border rounded-lg p-3 text-right">
                <p className="font-medium">{tree.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Permission Groups (admin only) */}
      {isAdmin && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button size="sm" onClick={() => setShowPermGroupModal(true)}>
              إنشاء مجموعة صلاحيات
            </Button>
            <h2 className="text-xl font-semibold">مجموعات الصلاحيات</h2>
          </div>
          {permGroups.length === 0 ? (
            <p className="text-muted-foreground">
              لا توجد مجموعات صلاحيات بعد.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {permGroups.map((pg: PermGroup) => (
                <div
                  key={pg.id}
                  className="flex flex-row items-center justify-between border rounded-lg p-3 text-right"
                >
                  <p className="font-medium">{pg.name}</p>
                  <Button
                    onClick={() => {
                      setShowPermGroupModal(true);
                      setSelectedPermGroup(pg.id);
                    }}
                  >
                    تعديل
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Activity Log (admin only) */}
      {isAdmin && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">سجل النشاط</h2>
          {logsLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin" />
            </div>
          ) : logsError ? (
            <p className="text-destructive text-sm">فشل تحميل سجل النشاط.</p>
          ) : activityLogs.length === 0 ? (
            <p className="text-muted-foreground">لا يوجد نشاط مسجل بعد.</p>
          ) : (
            <div className="flex flex-col gap-2" dir="rtl">
              {activityLogs.map((log) => {
                const actionLabel =
                  log.action === "CREATE"
                    ? "أضاف"
                    : log.action === "UPDATE"
                      ? "عدّل"
                      : "حذف";
                const entityLabel =
                  log.entityType === "PERSON"
                    ? "فردًا"
                    : log.entityType === "FAMILY"
                      ? "عائلة"
                      : log.entityType === "FAMILY_TREE"
                        ? "شجرة عائلية"
                        : "علاقة زوجية";
                const date = new Date(log.createdAt).toLocaleString("ar-SA");
                const sentence = `${log.userName ?? "مستخدم"} ${actionLabel} ${entityLabel}${log.entityName ? ` "${log.entityName}"` : ""}`;
                return (
                  <div key={log.id} className="border rounded-lg p-3" dir="rtl">
                    <p className="text-sm">{sentence}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {date}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Permissions Modal */}
      {permMemberLive && (
        <Modal isOpen={true} onClose={() => setPermMember(null)}>
          <PermissionsModal
            groupId={id}
            member={permMemberLive}
            families={families}
            trees={trees}
            permGroups={permGroups}
            onClose={() => setPermMember(null)}
          />
        </Modal>
      )}

      {/* Create Permission Group Modal */}
      <Modal
        isOpen={showPermGroupModal}
        onClose={() => setShowPermGroupModal(false)}
      >
        <CreatePermissionGroup
          id={group.id}
          onSuccess={() => setShowPermGroupModal(false)}
          onClose={() => setShowPermGroupModal(false)}
        />
      </Modal>

      {/* Edit Permission Group Modal */}
      {!!selectedPermGroup && (
        <Modal
          isOpen={showPermGroupModal}
          onClose={() => setShowPermGroupModal(false)}
        >
          <EditPermissionGroup
            groupId={group.id}
            permGroupId={selectedPermGroup}
            onSuccess={() => setShowPermGroupModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
