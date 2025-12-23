"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BurgerMenu from "@/components/client/BurgerMenu";
import { Modal } from "@/components/client/Modal";
import CreatePersonForm from "@/components/forms/CreatePersonForm";
import AddFamilyForm from "@/components/forms/AddFamilyForm";

export default function Home() {
  const [isAddingFamily, setIsAddingFamily] = useState<boolean>(false);
  const [isCreatingPerson, setIsCreatingPerson] = useState<boolean>(false);
  const [families, setFamilies] = useState<FamilyWithRootPerson[] | null>();

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  
  const router = useRouter();
  
  const handleRedirect = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = formData.get("familyId") as string;
    
    if (id) {
      router.push(`/tree/${id}`);
    }
  };
  
  const { data, isLoading: familiesLoading, error: familiesError, mutate: mutateFamilies } = useSWR<FamilyWithRootPerson[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family/owner`,
    fetcher
  );
  const { data: members, isLoading: membersLoading, error: membersError, mutate: mutateMembers } = useSWR<PersonWithRelations[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/owner`,
        fetcher
    );
    
  
  useEffect(() => {
    if (session && data) {
      setFamilies(data)
    }
  }, [data])

  if (membersError) return <ErrorAlert title="حدث خطأ!" message="حدث خطأ في الحصول على بيانات الأفراد"/>
  if (familiesError) return <ErrorAlert title="حدث خطأ!" message="حدث خطأ في الحصول على بيانات العائلات"/>
 
  if (familiesLoading || membersLoading) return <div className="flex flex-col items-center justify-center h-screen"><Loader2 /></div>

  if (!families || !members) {
    return (
      <>
        <div className="flex flex-row gap-2 p-4">
        <BurgerMenu />
        </div>
        <div className="flex justify-center items-center h-screen w-full text-4xl">
          No Data to Display!
        </div>
      </>
    )
  }

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
    <div className="font-arabic w-full">
      <div className="flex flex-row gap-2 p-4">
        <BurgerMenu 
          onAddFamily={() => {setIsAddingFamily(true)}}
          onCreatePerson={() => {setIsCreatingPerson(true)}}
        />
      </div>
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
      <div className="flex items-center-safe justify-center-safe h-screen w-full">
        <form onSubmit={handleRedirect} className="flex flex-col gap-4 justify-center items-center h-screen w-full">
          <div className="w-full flex items-center justify-center">
          <select name="familyId" className="w-1/2 flex border rounded-lg p-2">
            <option value="">اختر عائلة</option>
            {families && families.filter((f) => f.isDisplayed === true).map((f) => (
              <option key={f.id} value={f.id} className="text-black">
                {f.name}
              </option>
            ))}
          </select>
          </div>
          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              className="w-1/4 py-2 px-4 font-semibold rounded-md transition"
            >
              تأكيد
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
