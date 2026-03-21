'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/client/Modal';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import {
  useGroups,
  useGroupInvites,
  useCreateGroup,
  useRespondToInvite,
} from '@/hooks/useGroup';

export default function GroupsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const isPro = session?.user?.subscribtion === 'PRO';

  const { data: groups = [], isLoading: groupsLoading, isError: groupsError } = useGroups();
  const { data: invites = [], isLoading: invitesLoading } = useGroupInvites();
  const { mutateAsync: createGroup } = useCreateGroup();
  const { mutateAsync: respondToInvite } = useRespondToInvite();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [respondingId, setRespondingId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newGroupName.trim()) return;
    setCreating(true);
    try {
      await createGroup({ name: newGroupName.trim(), description: newGroupDesc.trim() || undefined });
      toast('تم إنشاء المجموعة بنجاح.');
      setShowCreateModal(false);
      setNewGroupName('');
      setNewGroupDesc('');
    } catch {
      toast('فشل إنشاء المجموعة.');
    } finally {
      setCreating(false);
    }
  };

  const handleRespond = async (groupId: string, memberId: string, action: 'ACCEPT' | 'REJECT') => {
    setRespondingId(memberId);
    try {
      await respondToInvite({ groupId, memberId, action });
      toast(action === 'ACCEPT' ? 'تم قبول الدعوة.' : 'تم رفض الدعوة.');
    } catch {
      toast('فشل الرد على الدعوة.');
    } finally {
      setRespondingId(null);
    }
  };

  if (groupsLoading || invitesLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (groupsError) return <ErrorAlert title="خطأ" message="فشل تحميل المجموعات." />;

  return (
    <div className="container mx-auto py-10 max-w-3xl" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">المجموعات</h1>
        {isPro ? (
          <Button onClick={() => setShowCreateModal(true)}>إنشاء مجموعة</Button>
        ) : (
          <p className="text-sm text-muted-foreground">يتطلب إنشاء مجموعة اشتراك PRO</p>
        )}
      </div>

      {/* Pending Invites */}
      {invites.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">الدعوات المعلقة</h2>
          <div className="flex flex-col gap-3">
            {invites.map((invite: { id: string; groupId: string; group: { name: string; description?: string } }) => (
              <div
                key={invite.id}
                className="flex items-center justify-between border rounded-lg p-4 bg-card"
              >
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={respondingId === invite.id}
                    onClick={() => handleRespond(invite.groupId, invite.id, 'ACCEPT')}
                  >
                    قبول
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={respondingId === invite.id}
                    onClick={() => handleRespond(invite.groupId, invite.id, 'REJECT')}
                  >
                    رفض
                  </Button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{invite.group.name}</p>
                  {invite.group.description && (
                    <p className="text-sm text-muted-foreground">{invite.group.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* My Groups */}
      <section>
        <h2 className="text-xl font-semibold mb-4">مجموعاتي</h2>
        {groups.length === 0 ? (
          <p className="text-muted-foreground">لا توجد مجموعات بعد.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {groups.map((group: { id: string; name: string; description?: string; _count?: { members: number } }) => (
              <div
                key={group.id}
                className="flex items-center justify-between border rounded-lg p-4 bg-card hover:bg-accent/10 cursor-pointer"
                onClick={() => router.push(`/groups/${group.id}`)}
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); router.push(`/groups/${group.id}`); }}
                >
                  فتح
                </Button>
                <div className="text-right">
                  <p className="font-semibold">{group.name}</p>
                  {group.description && (
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  )}
                  {group._count && (
                    <p className="text-xs text-muted-foreground">{group._count.members} عضو</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Create Group Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <div className="p-6 max-w-md mx-auto" dir="rtl">
          <h2 className="text-2xl font-semibold mb-6">إنشاء مجموعة جديدة</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">اسم المجموعة <span className="text-red-500">*</span></label>
              <Input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="اسم المجموعة"
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">الوصف (اختياري)</label>
              <Input
                value={newGroupDesc}
                onChange={(e) => setNewGroupDesc(e.target.value)}
                placeholder="وصف المجموعة"
                dir="rtl"
              />
            </div>
            <Button
              className="w-full"
              disabled={creating || !newGroupName.trim()}
              onClick={handleCreate}
            >
              {creating ? <Loader2 className="animate-spin w-4 h-4" /> : 'إنشاء'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
