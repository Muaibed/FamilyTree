"use client"; 

import React, { Suspense } from "react";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { FamilyWithRootPerson } from "@/types/family";
import useSWR from "swr";
import RadialCluster from "@/components/client/RadialClsuter";
import ExportTreeButton from "@/components/client/ExportTreeButton";


export default function d3() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    members,
    isLoading,
    error,
    mutate: mutateMembers,
  } = useMembersContext();

  const { data: families, isLoading: familiesLoading, error: familiesError, mutate: mutateFamilies } = useSWR<FamilyWithRootPerson[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family`,
    fetcher
  );

  return <div className="flex items-center-safe justify-center-safe w-full h-screen">
     <div>
                  <ExportTreeButton />
                </div>
        <Suspense>
          <RadialCluster
            members={members}
            families={families}
            onChange={mutateMembers}
          />
        </Suspense>
        </div>;
}
