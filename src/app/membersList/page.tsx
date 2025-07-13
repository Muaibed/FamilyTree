'use client'

import { FamilyTableClient } from "./FamilyTableClient";
import { useMembersContext } from "@/components/client/MembersContextProvider";

export default function Page() {
  const { members, isLoading, error, mutate } = useMembersContext();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="container mx-auto py-10">
      <FamilyTableClient data={members} onChange={mutate} />
    </div>
  );
}
