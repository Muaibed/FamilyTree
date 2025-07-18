"use client";

import AddFamilyForm from "@/components/forms/AddFamilyForm";
import CreatePersonForm from "@/components/forms/CreatePersonForm";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import FamilyTreeView from "@/components/client/FamilyTreeView";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { Modal } from "@/components/client/Modal";
import NoDataAlert from "@/components/alerts/NoDataAlert";
import { Button } from "@/components/ui/button";
import { Family } from "@/generated/prisma";
import { signOut, useSession } from "next-auth/react";
import { Suspense, useState } from "react";
import useSWR from "swr";
import { FamilyWithRootPerson } from "@/types/family";
import { Loader2 } from "lucide-react";
import { BlurBackground } from "@/components/ui/BlurBackground";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  const params = new URLSearchParams({ name: "المعيبد" });
  const {
    data: defaulfFamily,
    isLoading: familiesLoading,
    error: familiesError,
    mutate: mutateFamily,
  } = useSWR<FamilyWithRootPerson>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family?${params.toString()}`,
    fetcher
  );

  const { data: families } = useSWR<FamilyWithRootPerson[]>(
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
          Create Person
        </Button>
      )}
      <Modal
        isOpen={!!isCreatingPerson}
        onClose={() => setIsCreatingPerson(false)}
      >
        <CreatePersonForm members={members} onCreate={mutateMembers} />
      </Modal>
    </>
  );

  if (error || !members) return <ErrorAlert title="Something went wrong!"/>

  if (familiesLoading || isLoading) return <div className="flex flex-col items-center justify-center h-screen"><Loader2 /></div>
  if (familiesError || error)
    return (
      <ErrorAlert
        title="Something went wrong!"
        message="Try refreshing the page"
      ></ErrorAlert>
    );
  if (!defaulfFamily) {
    if (session && isAdmin) {
      return (<>
        <div className="flex flex-col items-center justify-center">
          {createMember}
          <NoDataAlert
            title="No Families Found!"
            message="Add some data to get started."
          ></NoDataAlert>
          <Button onClick={() => setIsAddingFamily(true)}>Add Family</Button>
          <Modal
            isOpen={!!isAddingFamily}
            onClose={() => setIsAddingFamily(false)}
          >
            <AddFamilyForm
              members={members}
              onAdd={() => {
                setIsAddingFamily(false);
              }}
            ></AddFamilyForm>
          </Modal>
        </div>
      </>
      );
    }
    return <NoDataAlert title="No Families Found"></NoDataAlert>;
  }

  return (
    <div >
      <div className="absolute z-55">
      <div className="flex flex-row gap-2 pt-4 pl-4">
      {session && (
        <div>
          <Button className="" onClick={() => signOut()}>Sign out</Button>
        </div>
      )}
      {session && isAdmin && (
        <>
          <div>
          {createMember}
          </div>
          <div>
          <Button onClick={() => setIsAddingFamily(true)}>Add Family</Button>
          </div>
          <Modal
            isOpen={!!isAddingFamily}
            onClose={() => setIsAddingFamily(false)}
          >
            <AddFamilyForm
              members={members}
              onAdd={() => setIsAddingFamily(false)}
            ></AddFamilyForm>
          </Modal>
        </>
      )}
      </div>
      </div>
      <Suspense>
        <FamilyTreeView
          members={members}
          families={families}
          family={defaulfFamily}
          onChange={mutateMembers}
        />
      </Suspense>
    </div>
  );
}
