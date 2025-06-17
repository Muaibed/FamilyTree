'use client'

import useSWR from "swr";
import { FamilyTableClient } from "./FamilyTableClient";
import { useMembersContext } from "@/components/client/MembersContextProvider";

export default function Page() {

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, isLoading, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher)

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="container mx-auto py-10">
      <FamilyTableClient data={data} onChange={mutate} />
    </div>
  );
}
