'use client' 

import FamilyTreeView from "@/components/client/FamilyTreeView";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { Family } from "@/generated/prisma";
import ThemeToggle from "@/theme/theme-toggle";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { members, isLoading, error, mutate } = useMembersContext();

  const params = new URLSearchParams({ name: 'المعيبد' });
  const { data: defaulfFamily, isLoading: familiesLoadin, error: familiesError, mutate: mutateFamilies } = useSWR<Family>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family?${params.toString()}`, fetcher);

  if (familiesLoadin) return <div>Loading...</div>
  if (familiesError) return <div>Error when getting families!</div>
  if (!defaulfFamily) return <div>No families found</div>

  return (
      <div className="relative w-full h-screen bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226]">
        <Suspense>
          <FamilyTreeView data={members} family={defaulfFamily} onChange={mutate} />
        </Suspense>
      </div>
  );
}
