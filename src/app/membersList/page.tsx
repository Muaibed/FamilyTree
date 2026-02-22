'use client'

import { FamilyTableClient } from "./FamilyTableClient";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/lib/queries/familyTreeMembers";

export default function Page() {
  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  return (
    <div className="container mx-auto py-5 overflow-y-auto min-h-screen">
      <FamilyTableClient data={members} />
    </div>
  );
}
