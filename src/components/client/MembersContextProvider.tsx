'use client';

import { FamilyTreeData } from "@/types/family";
import { createContext, useContext } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface MembersContextType {
    members: FamilyTreeData;
    isLoading: boolean;
    error: any;
    mutate: () => void;
}

const MembersContext = createContext<MembersContextType | null>(null);

export default function MembersContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers`, fetcher)

  if (!data) return null
  
  return <MembersContext.Provider value={{ members: data, isLoading, error, mutate }}>
            {children}
        </MembersContext.Provider>;
}

export function useMembersContext() {
    const context = useContext(MembersContext);
    if (!context)
        throw new Error('useMembersContext must be used within a MemebersContextProvider!')

    return context;
}
