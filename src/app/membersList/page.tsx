'use client'

import { Loader2 } from "lucide-react";
import { FamilyTableClient } from "./FamilyTableClient";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import useSWR from "swr";
import { PersonWithRelations } from "@/types/family";
import { useEffect, useState } from "react";

export default function Page() {
  const [currentFamily, setCurrentFamily] = useState<string | null>();

  useEffect(() => {
    setCurrentFamily(sessionStorage.getItem('selectedFamily'));
  }, [])
  
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: members, isLoading, error, mutate } = useSWR<PersonWithRelations[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/${currentFamily}`,
      fetcher
  );
  
  if (isLoading) return <div className="flex items-center justify-center w-full h-screen">
    <Loader2 />
  </div>

  if (error || !members) return <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات" />

  return (
    <div className="container mx-auto py-5 overflow-y-auto min-h-screen">
      <FamilyTableClient data={members} onChange={() => mutate} />
    </div>
  );
}
