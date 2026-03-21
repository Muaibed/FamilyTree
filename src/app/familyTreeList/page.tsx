"use client";

import { useQuery } from "@tanstack/react-query";
import { getOwnerFamilyTrees } from "@/lib/queries/familyTrees";
import { FamilyTreeWithDetails } from "@/types/family";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { FamilyTreeTableClient } from "./FamilyTreeTableClient";

type TreeRow = FamilyTreeWithDetails & { canEdit?: boolean; canDelete?: boolean };

export default function FamilyTreeListPage() {
  const {
    data: trees = [],
    isLoading,
    isError,
  } = useQuery<TreeRow[]>({
    queryKey: ["owner-family-trees"],
    queryFn: getOwnerFamilyTrees as () => Promise<TreeRow[]>,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 />
      </div>
    );

  if (isError)
    return <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات" />;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">أشجار العائلة</h1>
      <FamilyTreeTableClient data={trees} />
    </div>
  );
}
