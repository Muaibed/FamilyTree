"use client"

import CreatePerson from "@/app/pages/CreatePerson";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import BurgerMenu from "@/components/client/BurgerMenu";
import { downloadSVG, downloadPDF } from "@/components/client/ExportTreeButton";
import { Modal } from "@/components/client/Modal";
import RadialCluster from "@/components/client/RadialClsuter";
import CreateFamily from "@/app/pages/CreateFamily";
import { getMembers } from "@/lib/queries/familyTreeMembers";
import { FamilyWithRootPerson } from "@/types/family";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Suspense, use, useEffect, useState } from "react";
import { getRelatedFamilies } from "@/lib/queries/families";

export default function Tree({ params }: {params: Promise<{id: string}>}) {
    const { id } = use(params);

    const [isAddingFamily, setIsAddingFamily] = useState<boolean>(false);
    const [isCreatingPerson, setIsCreatingPerson] = useState<boolean>(false);

    const { data: members = [], isLoading: membersLoading, isError: membersError } = useQuery({
      queryKey: ["members"],
      queryFn: getMembers,
    });

    const { data: families = [], isLoading: familiesLoading, isError: familiesError } = useQuery({
      queryKey: ["related-families", id],
      queryFn: () => getRelatedFamilies(id),
    });

    const { data: session, status } = useSession();
    const isAdmin = session?.user?.role === "ADMIN";

    useEffect(() => {
      sessionStorage.setItem("selectedFamily", id);
    }, [id]);

    if (membersError || familiesError) return <ErrorAlert title="حدث خطأ!" />;

    if (familiesLoading || membersLoading) return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 />
      </div>
    );

    if (!members || !families) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-4xl">
          No Data Found!
        </div>
      );
    }
    
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
          onCreatePerson={() => {setIsCreatingPerson(true)}}
          onAddFamily={() => {setIsAddingFamily(true)}}
          onExportSVG={() => {downloadSVG()}}
          onExportPDF={() => {downloadPDF()}}

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
          families={families}
          onChange={() => "mutate members"}
          family={families?.find(f => f.id === id)}
        />
      </Suspense>
      </div>
    </div>
  );
};
