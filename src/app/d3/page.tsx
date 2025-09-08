"use client"; 

import React, { Suspense } from "react";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { FamilyWithRootPerson } from "@/types/family";
import useSWR from "swr";
import RadialCluster from "@/components/client/RadialClsuter";

// const data: TreeNode = {
//   name: "root",
//   children: [
//     { name: "child1" },
//     {
//       name: "child2",
//       children: [
//         { name: "grandchild1" },
//         { name: "grandchild2" },
//       ],
//     },
//   ],
// };

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
        <Suspense>
          <RadialCluster
            members={members}
            families={families}
            onChange={mutateMembers}
          />
        </Suspense>
        </div>;
}
