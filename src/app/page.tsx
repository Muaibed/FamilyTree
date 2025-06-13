'use client' 

import FamilyTreeView from "@/components/client/FamilyTreeView";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import SessionProviderWrapper from "@/components/client/SessionProviderWrapper";
import ThemeToggle from "@/theme/theme-toggle";
import { Suspense } from "react";
import useSWR from "swr";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  const { members, isLoading, error, mutate } = useMembersContext();

  return (
      <div className="relative w-full h-screen bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226]">
        <ThemeToggle />
        <Suspense>
          <FamilyTreeView data={members} onChange={mutate} />
        </Suspense>
      </div>
  );
}
