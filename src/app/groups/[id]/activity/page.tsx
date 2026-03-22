"use client";

import { useParams, useRouter } from "next/navigation";
import { Activity, ArrowRight, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { useActivityLog } from "@/hooks/useGroup";
import { useGroupMembers } from "@/hooks/useGroup";
import { useSession } from "next-auth/react";

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
  PERMISSION_GROUP: "مجموعة صلاحيات",
  GROUP: "مجموعة",
  GROUP_MEMBER: "عضو",
};

export default function ActivityLogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const { data: members = [] } = useGroupMembers(id);

  const currentMember = members.find((m: { user: { id: string }; isAdmin: boolean }) => m.user.id === session?.user?.id);
  const isAdmin = currentMember?.isAdmin ?? false;

  const { data: activityLogs = [], isLoading, isError } = useActivityLog(id, isAdmin);

  if (isError) return <ErrorAlert title="خطأ" message="فشل تحميل سجل النشاط." />;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="bg-card border-b px-6 py-5 mb-6">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/groups/${id}`)}>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-muted-foreground" />
            <h1 className="text-xl font-bold">سجل النشاط الكامل</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-12">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-muted-foreground w-6 h-6" />
          </div>
        ) : activityLogs.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-12">لا يوجد نشاط مسجل بعد.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {activityLogs.map((log) => {
              const date = new Date(log.createdAt).toLocaleString("ar-SA");
              const entity = `${ENTITY_LABEL[log.entityType] ?? log.entityType}${log.entityName ? ` "${log.entityName}"` : ""}`;
              return (
                <div key={log.id} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-card border shadow-sm">
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
          </div>
        )}
      </div>
    </div>
  );
}
