'use client'

import { FamilyTableClient } from "./FamilyTableClient";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOwnerFamilies } from "@/lib/queries/families";

export default function Page() {
  const queryClient = useQueryClient();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["owner-families"],
    queryFn: getOwnerFamilies,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader2 />
    </div>
  );

  if (isError || !data) return <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات" />;

  return (
    <div className="container mx-auto py-10">
      <FamilyTableClient
        data={data}
        onChange={() => queryClient.invalidateQueries({ queryKey: ["owner-families"] })}
      />
    </div>
  );
}
