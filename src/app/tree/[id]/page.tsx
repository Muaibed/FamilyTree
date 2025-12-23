"use client"

import ErrorAlert from "@/components/alerts/ErrorAlert";
import BurgerMenu from "@/components/client/BurgerMenu";
import { downloadSVG, downloadPDF } from "@/components/client/ExportTreeButton";
import { Modal } from "@/components/client/Modal";
import RadialCluster from "@/components/client/RadialClsuter";
import AddFamilyForm from "@/components/forms/AddFamilyForm";
import CreatePersonForm from "@/components/forms/CreatePersonForm";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Suspense, use, useEffect, useState } from "react";
import useSWR from "swr";

export default function Tree({ params }: {params: Promise<{id: string}>}) {
    const { id } = use(params);

    const [isAddingFamily, setIsAddingFamily] = useState<boolean>(false);
    const [isCreatingPerson, setIsCreatingPerson] = useState<boolean>(false);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: members, isLoading: membersLoading, error: membersError, mutate: mutateMembers } = useSWR<PersonWithRelations[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/${id}`,
        fetcher
    );
    
    const { data: session, status } = useSession();
    const isAdmin = session?.user?.role === "ADMIN";
    
    const { data: families, isLoading: familiesLoading, error: familiesError, mutate: mutateFamilies } = useSWR<FamilyWithRootPerson[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/family/relatedFamilies/${id}`,
      fetcher
    );
    
    useEffect(() => {
      sessionStorage.setItem("selectedFamily", id)
    }, []);
    
    if (membersError || familiesError || !families) return <ErrorAlert title="حدث خطأ!"/>
  
    if (!members) {
        return <div className="flex flex-col items-center justify-center h-screen text-4xl">
            No Data Found!
            </div>
    }

    if (familiesLoading || membersLoading) return <div className="flex flex-col items-center justify-center h-screen"><Loader2 /></div>

    const createMember = (
      <>
      <Modal
        isOpen={!!isCreatingPerson}
        onClose={() => setIsCreatingPerson(false)}
      >
        <CreatePersonForm members={members} onCreate={() => {mutateMembers(); setIsCreatingPerson(false)}} />
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
            <AddFamilyForm
              onAdd={() => setIsAddingFamily(false)}
            ></AddFamilyForm>
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
          onChange={mutateMembers}
          family={families?.find(f => f.id === id)}
        />
      </Suspense>
      </div>
    </div>
  );
};
