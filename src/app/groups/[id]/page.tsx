"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Loader2,
  Users,
  Shield,
  GitBranch,
  Home,
  Activity,
  Mail,
  Crown,
  Trash2,
  Settings,
  UserPlus,
  Clock,
  Plus,
  PenLine,
} from "lucide-react";
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
  useDeletePermissionGroup,
  useDeleteGroup,
} from "@/hooks/useGroup";
import {
  Family,
  FamilyPermission,
  GroupPermission,
  TreePermission,
} from "@/generated/prisma";
import CreatePermissionGroup from "@/app/pages/PermissionGroup/CreatePermissionGroup";
import EditPermissionGroup from "@/app/pages/PermissionGroup/EditPermissionGroup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

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

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0">
      {initials || "؟"}
    </div>
  );
}

function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3 py-1">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card border rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="flex items-center justify-between px-5 py-4 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-foreground font-semibold text-base">
          {icon}
          {title}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

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
    <div className="flex gap-2 items-center mt-3">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2 bg-background text-sm"
        dir="rtl"
      >
        {available.map((pg) => (
          <option key={pg.id} value={pg.id}>
            {pg.name}
          </option>
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
  const [selectedFamilyId, setSelectedFamilyId] = useState(families[0]?.id ?? "");
  const [familyPermsSel, setFamilyPermsSel] = useState<FamilyPermission[]>(
    member.familyPermissions?.filter((f) => f.familyId === (families[0]?.id ?? "")).map((p) => p.permission) ?? [],
  );
  const [selectedTree, setSelectedTree] = useState(trees[0]?.id ?? "");
  const [treePermsSel, setTreePermsSel] = useState<TreePermission[]>(
    member.treePermissions?.filter((t) => t.treeId === (trees[0]?.id ?? "")).map((p) => p.permission) ?? [],
  );
  const [saving, setSaving] = useState(false);

  const selectedFamily = useMemo(
    () => families.find((f) => f.id === selectedFamilyId),
    [selectedFamilyId, families],
  );

  const toggle = <T extends string>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const handleSave = async () => {
    setSaving(true);
    try {
      await setGroupPerms({ memberId: member.id, permissions: groupPermsSel });
      if (selectedFamily) {
        await setFamilyPerms({ memberId: member.id, familyId: selectedFamilyId, permissions: familyPermsSel });
      }
      if (selectedTree) {
        await setTreePerms({ memberId: member.id, treeId: selectedTree, permissions: treePermsSel });
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
    <div className="p-6 max-w-lg mx-auto space-y-5 max-h-[80vh] overflow-y-auto" dir="rtl">
      <div className="flex items-center gap-3 pb-2 border-b">
        <Avatar name={member.user.name ?? member.user.email} />
        <div>
          <h2 className="text-lg font-semibold">{member.user.name ?? member.user.email}</h2>
          <p className="text-xs text-muted-foreground">{member.user.email}</p>
        </div>
      </div>

      {/* Group-level permissions */}
      <div>
        <p className="text-sm font-medium mb-2 text-muted-foreground">صلاحيات المجموعة</p>
        <div className="grid grid-cols-2 gap-2">
          {GROUP_PERMS.map((p) => (
            <label key={p.value} className="flex items-center gap-2 cursor-pointer text-sm border rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={groupPermsSel.includes(p.value)}
                onChange={() => setGroupPermsSel(toggle(groupPermsSel, p.value))}
                className="accent-primary"
              />
              {p.label}
            </label>
          ))}
        </div>
      </div>

      {/* Family-level permissions */}
      {families.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2 text-muted-foreground">صلاحيات العائلة</p>
          <select
            value={selectedFamilyId}
            onChange={(e) => {
              const newFamilyId = e.target.value;
              setSelectedFamilyId(newFamilyId);
              setFamilyPermsSel(
                member.familyPermissions?.filter((f) => f.familyId === newFamilyId).map((p) => p.permission) ?? [],
              );
            }}
            className="w-full border rounded-lg px-3 py-2 bg-background text-sm mb-3"
            dir="rtl"
          >
            {families.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          {selectedFamily?.creatorId === member.user.id ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2">
              <Crown className="w-4 h-4 text-blue-500" />
              <span>لديه جميع الصلاحيات لهذه العائلة</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {FAMILY_PERMS.map((p) => (
                <label key={p.value} className="flex items-center gap-2 cursor-pointer text-sm border rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={familyPermsSel.includes(p.value)}
                    onChange={() => setFamilyPermsSel(toggle(familyPermsSel, p.value))}
                    className="accent-primary"
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
          <p className="text-sm font-medium mb-2 text-muted-foreground">صلاحيات الشجرة</p>
          <select
            value={selectedTree}
            onChange={(e) => {
              const newTreeId = e.target.value;
              setSelectedTree(newTreeId);
              setTreePermsSel(
                member.treePermissions?.filter((t) => t.treeId === newTreeId).map((p) => p.permission) ?? [],
              );
            }}
            className="w-full border rounded-lg px-3 py-2 bg-background text-sm mb-3"
            dir="rtl"
          >
            {trees.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            {TREE_PERMS.map((p) => (
              <label key={p.value} className="flex items-center gap-2 cursor-pointer text-sm border rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={treePermsSel.includes(p.value)}
                  onChange={() => setTreePermsSel(toggle(treePermsSel, p.value))}
                  className="accent-primary"
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
          <p className="text-sm font-medium mb-2 text-muted-foreground">مجموعات الصلاحيات المُعيَّنة</p>
          {member.permissionGroupAssignments?.length > 0 ? (
            <div className="flex flex-col gap-2 mb-2">
              {member.permissionGroupAssignments.map((a) => (
                <div key={a.id} className="flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-muted/30">
                  <span className="font-medium">{a.permissionGroup.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 px-2"
                    onClick={async () => {
                      try {
                        await removePermGroupAssignment({ memberId: member.id, assignmentId: a.id });
                        toast("تم إزالة مجموعة الصلاحيات.");
                      } catch {
                        toast("فشل إزالة مجموعة الصلاحيات.");
                      }
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mb-2">لا توجد مجموعات صلاحيات مُعيَّنة.</p>
          )}
          {(() => {
            const assignedIds = new Set(member.permissionGroupAssignments?.map((a) => a.permissionGroup.id));
            const available = permGroups.filter((pg) => !assignedIds.has(pg.id));
            if (available.length === 0) return null;
            return <AssignPermGroupRow available={available} onAssign={async (pgId) => {
              try {
                await assignPermGroup({ memberId: member.id, permissionGroupId: pgId });
                toast("تم تعيين مجموعة الصلاحيات.");
              } catch {
                toast("فشل تعيين مجموعة الصلاحيات.");
              }
            }} />;
          })()}
        </div>
      )}

      <Button className="w-full" disabled={saving} onClick={handleSave}>
        {saving ? <Loader2 className="animate-spin w-4 h-4" /> : "حفظ الصلاحيات"}
      </Button>
    </div>
  );
}

const ACTION_LABEL: Record<string, string> = {
  CREATE: "أضاف",
  UPDATE: "عدّل",
  DELETE: "حذف",
  INVITE: "دعا",
  ACCEPT: "قبل دعوة",
  REJECT: "رفض دعوة",
  REMOVE: "أزال",
};
const ACTION_COLOR: Record<string, string> = {
  CREATE: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  UPDATE: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  INVITE: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  ACCEPT: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  REJECT: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  REMOVE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};
const ENTITY_LABEL: Record<string, string> = {
  PERSON: "فردًا",
  FAMILY: "عائلة",
  FAMILY_TREE: "شجرة عائلية",
  SPOUSE_RELATIONSHIP: "علاقة زوجية",
  PERMISSION_GROUP: 'مجموعة صلاحيات',
  GROUP: 'مجموعة',
  GROUP_MEMBER: 'عضو'
};

export default function GroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();

  const { data: group, isLoading: groupLoading, isError: groupError } = useGroup(id);
  const { data: members = [], isLoading: membersLoading } = useGroupMembers(id);

  const currentMember = members.find((m: Member) => m.user.id === session?.user?.id);
  const isAdmin = currentMember?.isAdmin ?? false;

  const { data: permGroups = [] } = usePermissionGroups(id, isAdmin);
  const { data: activityLogs = [], isLoading: logsLoading, isError: logsError } = useActivityLog(id, isAdmin);

  const { mutateAsync: deletePermGroup } = useDeletePermissionGroup(id);
  const { mutateAsync: deleteGroup, isPending: deletingGroup } = useDeleteGroup();
  const { mutateAsync: inviteMember } = useInviteMember(id);
  const { mutateAsync: removeMember } = useRemoveMember(id);
  const { mutateAsync: setMemberAdmin } = useSetMemberAdmin(id);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [permMember, setPermMember] = useState<Member | null>(null);
  const [showPermGroupModal, setShowPermGroupModal] = useState(false);
  const [selectedPermGroup, setSelectedPermGroup] = useState<string | null>();
  const [confirmDelete, setConfirmDelete] = useState<{ message: string; onConfirm: () => void } | null>(null);

  const permMemberLive = permMember
    ? (members.find((m: Member) => m.id === permMember.id) ?? permMember)
    : null;

  const families: Family[] = group?.families ?? [];
  const trees: { id: string; name: string }[] = group?.familyTrees ?? [];
  const activeMembers: Member[] = members.filter((m: Member) => m.inviteStatus === "ACCEPTED");
  const pendingInvites: Member[] = (group?.members ?? []).filter((m: Member) => m.inviteStatus === "PENDING");

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

  const handleRemove = (member: Member) => {
    const isPending = member.inviteStatus === "PENDING";
    setConfirmDelete({
      message: isPending
        ? `هل أنت متأكد من إلغاء دعوة ${member.user.name ?? member.user.email}؟`
        : `هل أنت متأكد من إزالة ${member.user.name ?? member.user.email} من المجموعة؟`,
      onConfirm: async () => {
        try {
          await removeMember(member.id);
          toast(isPending ? "تم إلغاء الدعوة." : "تم إزالة العضو.");
        } catch {
          toast(isPending ? "فشل إلغاء الدعوة." : "فشل إزالة العضو.");
        }
        setConfirmDelete(null);
      },
    });
  };

  if (groupError)
    return <ErrorAlert title="خطأ" message="فشل تحميل المجموعة." />;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero header */}
      <div className="bg-card border-b px-6 py-8 mb-6">
        <div className="max-w-4xl mx-auto">
          {groupLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-8 w-48 bg-muted rounded-lg" />
              <div className="h-4 w-72 bg-muted rounded" />
              <div className="flex gap-6 mt-5">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold tracking-tight">{group!.name}</h1>
              {group!.description && (
                <p className="text-muted-foreground mt-1 text-sm">{group!.description}</p>
              )}
              <div className="flex gap-6 mt-5 flex-wrap">
                {[
                  { icon: <Users className="w-4 h-4" />, label: "عضو", count: activeMembers.length },
                  { icon: <Home className="w-4 h-4" />, label: "عائلة", count: families.length },
                  { icon: <GitBranch className="w-4 h-4" />, label: "شجرة", count: trees.length },
                ].map(({ icon, label, count }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    {icon}
                    <span className="font-semibold text-foreground">{count}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-12">

        {/* Invite (admin only) */}
        {isAdmin && (
          <SectionCard title="دعوة عضو" icon={<UserPlus className="w-4 h-4" />}>
            <div className="flex gap-2">
              <Input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="البريد الإلكتروني للعضو الجديد"
                type="email"
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              />
              <Button disabled={inviting} onClick={handleInvite}>
                {inviting ? <Loader2 className="animate-spin w-4 h-4" /> : "إرسال دعوة"}
              </Button>
            </div>
          </SectionCard>
        )}

        {/* Pending Invites (admin only) */}
        {isAdmin && pendingInvites.length > 0 && (
          <SectionCard
            title={`الدعوات المعلقة (${pendingInvites.length})`}
            icon={<Mail className="w-4 h-4" />}
          >
            <div className="flex flex-col gap-2">
              {pendingInvites.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={invite.user.name ?? invite.user.email} />
                    <div>
                      <p className="font-medium text-sm">{invite.user.name ?? invite.user.email}</p>
                      <p className="text-xs text-muted-foreground">{invite.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/40 rounded-full">
                      في الانتظار
                    </span>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleRemove(invite)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Members */}
        <SectionCard title={membersLoading ? "الأعضاء" : `الأعضاء (${activeMembers.length})`} icon={<Users className="w-4 h-4" />}>
          {membersLoading ? <SectionSkeleton rows={3} /> : (
          <div className="flex flex-col divide-y">
            {activeMembers.map((member: Member) => (
              <div key={member.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Avatar name={member.user.name ?? member.user.email} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{member.user.name ?? member.user.email}</p>
                      {member.isAdmin && (
                        <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          <Crown className="w-3 h-3" /> مشرف
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{member.user.email}</p>
                  </div>
                </div>
                {isAdmin && member.user.id !== session?.user?.id && (
                  <div className="flex gap-1.5 items-center">
                    {!member.isAdmin && (
                      <Button size="sm" variant="outline" className="h-8 gap-1.5" onClick={() => setPermMember(member)}>
                        <Settings className="w-3.5 h-3.5" />
                        الصلاحيات
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={member.isAdmin ? "secondary" : "outline"}
                      className="h-8"
                      onClick={() => handleToggleAdmin(member)}
                    >
                      {member.isAdmin ? "إلغاء مشرف" : "تعيين مشرف"}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleRemove(member)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {activeMembers.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-4">لا يوجد أعضاء بعد.</p>
            )}
          </div>
          )}
        </SectionCard>

        {/* Families & Trees side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <section className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b bg-muted/30 font-semibold text-base">
              <Home className="w-4 h-4" />
              {groupLoading ? "العائلات" : `العائلات (${families.length})`}
            </div>
            <div className="p-4">
              {groupLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-8 bg-muted rounded-lg" />
                  <div className="h-8 bg-muted rounded-lg" />
                </div>
              ) : families.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-2">لا توجد عائلات.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {families.map((family) => (
                    <div key={family.id} className="text-sm px-3 py-2 rounded-lg bg-muted/40 font-medium">
                      {family.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          <section className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b bg-muted/30 font-semibold text-base">
              <GitBranch className="w-4 h-4" />
              {groupLoading ? "أشجار العائلة" : `أشجار العائلة (${trees.length})`}
            </div>
            <div className="p-4">
              {groupLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-8 bg-muted rounded-lg" />
                  <div className="h-8 bg-muted rounded-lg" />
                </div>
              ) : trees.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-2">لا توجد أشجار.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {trees.map((tree) => (
                    <div key={tree.id} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-muted/40">
                      <span className="font-medium">{tree.name}</span>
                      <a href={`/tree/${tree.id}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                        <GitBranch className="w-3 h-3" /> عرض
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Permission Groups (admin only) */}
        {isAdmin && (
          <SectionCard
            title="مجموعات الصلاحيات"
            icon={<Shield className="w-4 h-4" />}
            action={
              <Button size="sm" className="gap-1.5 h-8" onClick={() => { setSelectedPermGroup(null); setShowPermGroupModal(true); }}>
                <Plus className="w-3.5 h-3.5" /> إنشاء
              </Button>
            }
          >
            {permGroups.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-2">لا توجد مجموعات صلاحيات بعد.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {permGroups.map((pg: PermGroup) => (
                  <div key={pg.id} className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted/40 border">
                    <span className="font-medium text-sm">{pg.name}</span>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-8 gap-1.5" onClick={() => { setSelectedPermGroup(pg.id); setShowPermGroupModal(true); }}>
                        <PenLine className="w-3.5 h-3.5" /> تعديل
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 text-destructive hover:text-destructive" onClick={() => setConfirmDelete({ message: `هل أنت متأكد من حذف مجموعة الصلاحيات "${pg.name}"؟`, onConfirm: async () => { await deletePermGroup(pg.id); setConfirmDelete(null); } })}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )}

        {/* Activity Log (admin only) */}
        {isAdmin && (
          <SectionCard
            title="سجل النشاط"
            icon={<Activity className="w-4 h-4" />}
            action={
              !logsLoading && activityLogs.length > 0 ? (
                <a href={`/groups/${id}/activity`} className="text-xs text-primary hover:underline flex items-center gap-1">
                  عرض الكل
                </a>
              ) : undefined
            }
          >
            {logsLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="animate-spin text-muted-foreground" />
              </div>
            ) : logsError ? (
              <p className="text-destructive text-sm text-center">فشل تحميل سجل النشاط.</p>
            ) : activityLogs.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-2">لا يوجد نشاط مسجل بعد.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {activityLogs.slice(0, 5).map((log) => {
                  const date = new Date(log.createdAt).toLocaleString("ar-SA");
                  const entity = `${ENTITY_LABEL[log.entityType] ?? log.entityType}${log.entityName ? ` "${log.entityName}"` : ""}`;
                  return (
                    <div key={log.id} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-muted/30 border">
                      <span className={`mt-0.5 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${ACTION_COLOR[log.action] ?? ""}`}>
                        {ACTION_LABEL[log.action] ?? log.action}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{log.userName ?? "مستخدم"}</span>
                          {" "}{ACTION_LABEL[log.action]}{" "}{entity}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />{date}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {activityLogs.length > 5 && (
                  <a href={`/groups/${id}/activity`} className="text-xs text-primary hover:underline text-center py-1">
                    + {activityLogs.length - 5} سجلات أخرى — عرض الكل
                  </a>
                )}
              </div>
            )}
          </SectionCard>
        )}
        
        {/* Danger Zone (admin only) */}
        {isAdmin && (
          <section className="border border-destructive/40 rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-destructive/30 bg-destructive/5 font-semibold text-base text-destructive">
              <Trash2 className="w-4 h-4" />
              منطقة الخطر
            </div>
            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm">حذف المجموعة</p>
                <p className="text-xs text-muted-foreground mt-0.5">سيتم حذف المجموعة وجميع بياناتها بشكل نهائي ولا يمكن التراجع عن ذلك.</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                disabled={deletingGroup}
                onClick={() => setConfirmDelete({
                  message: `هل أنت متأكد من حذف مجموعة "${group?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`,
                  onConfirm: async () => {
                    await deleteGroup(id);
                    setConfirmDelete(null);
                    router.push("/groups");
                  },
                })}
              >
                {deletingGroup ? <Loader2 className="w-4 h-4 animate-spin" /> : "حذف المجموعة"}
              </Button>
            </div>
          </section>
        )}
      </div>

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

      {/* Create / Edit Permission Group Modal */}
      {!!group && (
        <Modal isOpen={showPermGroupModal && !selectedPermGroup} onClose={() => setShowPermGroupModal(false)}>
          <CreatePermissionGroup
            id={group.id}
            onSuccess={() => setShowPermGroupModal(false)}
            onClose={() => setShowPermGroupModal(false)}
          />
        </Modal>
      )}

      {!!group && !!selectedPermGroup && (
        <Modal isOpen={showPermGroupModal} onClose={() => { setShowPermGroupModal(false); setSelectedPermGroup(null); }}>
          <EditPermissionGroup
            groupId={group.id}
            permGroupId={selectedPermGroup}
            onSuccess={() => { setShowPermGroupModal(false); setSelectedPermGroup(null); }}
          />
        </Modal>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        message={confirmDelete?.message ?? ""}
        onConfirm={() => confirmDelete?.onConfirm()}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
