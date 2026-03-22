"use client";

import CreatePerson from "@/app/pages/Person/CreatePerson";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import BurgerMenu from "@/components/client/BurgerMenu";
import { downloadSVG, downloadPDF } from "@/components/client/ExportTreeButton";
import { Modal } from "@/components/client/Modal";
import RadialCluster from "@/components/client/RadialClsuter";
import RadialDendrogram from "@/components/client/RadialDendrogram";
import TreeViewShell from "@/components/client/TreeViewShell";
import CreateFamily from "@/app/pages/Family/CreateFamily";
import { getMembers } from "@/lib/queries/familyTreeMembers";
import { getFamilyTree, getTreePermissions } from "@/lib/queries/familyTrees";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Suspense, use, useEffect, useState } from "react";

export default function Tree({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const queryClient = useQueryClient();

  const [isAddingFamily, setIsAddingFamily] = useState<boolean>(false);
  const [isCreatingPerson, setIsCreatingPerson] = useState<boolean>(false);
  const [layout, setLayout] = useState<"radial" | "dendrogram">("radial");

  const LAYOUTS = [
    { key: "radial", label: "شجري دائري" },
    { key: "dendrogram", label: "تجميعي دائري" },
  ] as const;

  const { data: session, status: sessionStatus } = useSession();

  const {
    data: members = [],
    isLoading: membersLoading,
    isError: membersError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
    enabled: !!session,
  });

  const {
    data: tree,
    isPending: treeLoading,
    isError: treeError,
  } = useQuery({
    queryKey: ["family-tree", id],
    queryFn: () => getFamilyTree(id),
  });

  const { data: treePermissions } = useQuery({
    queryKey: ["tree-permissions", id],
    queryFn: () => getTreePermissions(id),
    enabled: !!session,
  });

  useEffect(() => {
    sessionStorage.setItem("selectedTree", id);
  }, [id]);

  if (membersError || treeError) return <ErrorAlert title="حدث خطأ!" />;

  if (treeLoading || sessionStatus === "loading" || membersLoading)
    return (
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
  const initialBranchColors = Object.fromEntries(
    tree.personColors.map((c) => [
      c.personId,
      { link: c.linkColor, label: c.labelColor },
    ]),
  );

  const createMember = (
    <>
      <Modal
        isOpen={!!isCreatingPerson}
        onClose={() => setIsCreatingPerson(false)}
      >
        <CreatePerson onSuccess={() => {
          setIsCreatingPerson(false);
          queryClient.invalidateQueries({ queryKey: ["family-tree", id] });
        }} />
      </Modal>
    </>
  );

  return (
    <div className="font-arabic">
      {tree.membersCount > 0 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-55 text-sm bg-card backdrop-blur-sm rounded-xl px-3 py-1 select-none text-center">
          <div>{tree.membersCount} : عدد أفراد العائلة</div>
          <div className="flex gap-3 justify-center text-xs opacity-60 mt-0.5">
            <span>{tree.aliveCount} أحياء</span>
            <span>·</span>
            <span>{tree.deadCount} متوفون</span>
          </div>
        </div>
      )}
      <div className="absolute top-4 left-4 z-55">
        <div className="flex flex-row gap-2">
          <BurgerMenu
            onCreatePerson={() => {
              setIsCreatingPerson(true);
            }}
            onAddFamily={() => {
              setIsAddingFamily(true);
            }}
            onExportSVG={() => {
              downloadSVG();
            }}
            onExportPDF={() => {
              downloadPDF();
            }}
          />
          {session && (
            <>
              <div>{createMember}</div>
              <Modal
                isOpen={!!isAddingFamily}
                onClose={() => setIsAddingFamily(false)}
              >
                <CreateFamily onSuccess={() => setIsAddingFamily(false)} />
              </Modal>
            </>
          )}
        </div>
      </div>
      {/* Layout switcher */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[45] flex gap-1 bg-card/90 backdrop-blur-sm border rounded-xl shadow-md p-1">
        {LAYOUTS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setLayout(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              layout === key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full h-screen overflow-hidden">
        <Suspense>
          <TreeViewShell
            members={members}
            treeId={id}
            treeData={treeData}
            collapsedPersonIds={collapsedPersonIds}
            initialBranchColors={initialBranchColors}
            treePermissions={treePermissions}
            onChange={() => queryClient.invalidateQueries({ queryKey: ["family-tree", id] })}
          >
            {(props) => {
              if (layout === "dendrogram")
                return <RadialDendrogram {...props} />;
              return <RadialCluster {...props} />;
            }}
          </TreeViewShell>
        </Suspense>
      </div>
    </div>
  );
}
