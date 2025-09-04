"use client";

import AddFamilyForm from "@/components/forms/AddFamilyForm";
import CreatePersonForm from "@/components/forms/CreatePersonForm";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import FamilyTreeView from "@/components/client/FamilyTreeView";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { Modal } from "@/components/client/Modal";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Suspense, useState } from "react";
import useSWR from "swr";
import { FamilyWithRootPerson } from "@/types/family";
import { Loader2 } from "lucide-react";
import ExportTreeButton from "@/components/client/ExportTreeButton";

export default function Home() {
  const [isAddingFamily, setIsAddingFamily] = useState<boolean>(false);
  const [isCreatingPerson, setIsCreatingPerson] = useState<boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    members,
    isLoading,
    error,
    mutate: mutateMembers,
  } = useMembersContext();
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const { data: families, isLoading: familiesLoading, error: familiesError, mutate: mutateFamilies } = useSWR<FamilyWithRootPerson[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family`,
    fetcher
  );

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

  if (error || familiesError) return <ErrorAlert title="حدث خطأ!"/>

  if (familiesLoading || isLoading) return <div className="flex flex-col items-center justify-center h-screen"><Loader2 /></div>

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
        <FamilyTreeView
          members={members}
          families={families}
          onChange={mutateMembers}
        />
      </Suspense>
      </div>
    </div>
  );
}
