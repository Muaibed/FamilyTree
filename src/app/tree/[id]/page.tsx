"use client"

import CreatePerson from "@/app/pages/CreatePerson";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import BurgerMenu from "@/components/client/BurgerMenu";
import { downloadSVG, downloadPDF } from "@/components/client/ExportTreeButton";
import { Modal } from "@/components/client/Modal";
import RadialCluster from "@/components/client/RadialClsuter";
import CreateFamily from "@/app/pages/CreateFamily";
import { getOwnerMembers } from "@/lib/queries/familyTreeMembers";
import { getFamilyTree } from "@/lib/queries/familyTrees";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Suspense, use, useEffect, useState } from "react";

export default function Tree({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [isAddingFamily, setIsAddingFamily] = useState<boolean>(false);
  const [isCreatingPerson, setIsCreatingPerson] = useState<boolean>(false);

  const { data: session, status: sessionStatus } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const { data: members = [], isLoading: membersLoading, isError: membersError } = useQuery({
    queryKey: ["owner-members"],
    queryFn: getOwnerMembers,
    enabled: isAdmin,
  });

  const { data: tree, isPending: treeLoading, isError: treeError } = useQuery({
    queryKey: ["family-tree", id],
    queryFn: () => getFamilyTree(id),
  });

  useEffect(() => {
    sessionStorage.setItem("selectedTree", id);
  }, [id]);

  if (membersError || treeError) return <ErrorAlert title="حدث خطأ!" />;

  if (treeLoading || sessionStatus === "loading" || (isAdmin && membersLoading)) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 />
    </div>
  );

  if (!tree || !members) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-4xl">
        No Data Found!
      </div>
    );
  }

  const treeData = tree.treeJson as import("@/types/tree").TreeNode | null;
  const collapsedPersonIds = tree.collapsedBranches.map((b) => b.personId);

  const createMember = (
    <>
      <Modal
        isOpen={!!isCreatingPerson}
        onClose={() => setIsCreatingPerson(false)}
      >
        <CreatePerson onSuccess={() => setIsCreatingPerson(false)} />
      </Modal>
    </>
  );

  return (
    <div className="font-arabic">
      <div className="absolute z-55">
        <div className="flex flex-row gap-2 p-4">
          <BurgerMenu
            onCreatePerson={() => { setIsCreatingPerson(true) }}
            onAddFamily={() => { setIsAddingFamily(true) }}
            onExportSVG={() => { downloadSVG() }}
            onExportPDF={() => { downloadPDF() }}
          />
          {session && isAdmin && (
            <>
              <div>
                {createMember}
              </div>
              <Modal
                isOpen={!!isAddingFamily}
                onClose={() => setIsAddingFamily(false)}
              >
                <CreateFamily
                  onSuccess={() => setIsAddingFamily(false)}
                />
              </Modal>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center-safe justify-center-safe w-full h-screen overflow-auto">
        <Suspense>
          <RadialCluster
            members={members}
            treeId={id}
            treeData={treeData}
            collapsedPersonIds={collapsedPersonIds}
            onChange={() => "mutate members"}
          />
        </Suspense>
      </div>
    </div>
  );
}
