'use client'

import { Loader2 } from "lucide-react";
import { FamilyTableClient } from "./FamilyTableClient";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import ErrorAlert from "@/components/alerts/ErrorAlert";

export default function Page() {
  const { members, isLoading, error, mutate } = useMembersContext();

  if (isLoading) return <div className="flex items-center justify-center w-full h-screen">
    <Loader2 />
  </div>

  if (error) return <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات" />

  return (
    <div className="container mx-auto py-10">
      <FamilyTableClient data={members} onChange={mutate} />
    </div>
  );
}
