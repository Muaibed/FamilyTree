"use client"

import ErrorAlert from "@/components/alerts/ErrorAlert";
import ExportTreeButton from "@/components/client/ExportTreeButton";
import { Modal } from "@/components/client/Modal";
import RadialCluster from "@/components/client/RadialClsuter";
import AddFamilyForm from "@/components/forms/AddFamilyForm";
import CreatePersonForm from "@/components/forms/CreatePersonForm";
import { Button } from "@/components/ui/button";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { Loader2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { FC, Suspense, use, useState } from "react";
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/family`,
        fetcher
    );
    
    if (membersError || familiesError) return <ErrorAlert title="حدث خطأ!"/>
  
    if (familiesLoading || membersLoading) return <div className="flex flex-col items-center justify-center h-screen"><Loader2 /></div>

    if (!members) {
        return <div className="flex flex-col items-center justify-center h-screen text-4xl">
            No Members Found!
            </div>
    }
    const createMember = (
        <>
      {isAdmin && (
          <Button
          onClick={() => {
              setIsCreatingPerson(true);
            }}
            >
          إضافة فرد
        </Button>
      )}
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
      <div className="flex flex-row gap-2 pt-4 pl-4">
      {session && (
        <div>
          <Button className="" onClick={() => signOut()}>تسجيل خروج</Button>
        </div>
      )}
      {session && isAdmin && (
        <>
          <div>
            {createMember}
          </div>
          <div>
            <ExportTreeButton />
          </div>
          <div>
          <Button onClick={() => setIsAddingFamily(true)}>إضافة عائلة</Button>
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
      <div className="flex items-center-safe justify-center-safe w-full h-screen">
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
