"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense, useState } from "react";
import BurgerMenu from "@/components/client/BurgerMenu";
import { Modal } from "@/components/client/Modal";
import CreatePerson from "../pages/CreatePerson";
import CreateFamily from "../pages/CreateFamily";
import { useQuery } from "@tanstack/react-query";
import { getOwnerFamilies } from "@/lib/queries/families";
import { getOwnerMembers } from "@/lib/queries/familyTreeMembers";

export default function TreeHome() {
  const [isAddingFamily, setIsAddingFamily] = useState<boolean>(false);
  const [isCreatingPerson, setIsCreatingPerson] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const router = useRouter();

  const { data: families = [], isLoading: familiesLoading, isError: familiesError } = useQuery({
    queryKey: ["owner-families"],
    queryFn: getOwnerFamilies,
  });

  const { data: members = [], isLoading: membersLoading, isError: membersError } = useQuery({
    queryKey: ["owner-members"],
    queryFn: getOwnerMembers,
  });

  const handleRedirect = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = formData.get("familyId") as string;

    if (id) {
      router.push(`/tree/${id}`);
    }
  };

  if (membersError) return <ErrorAlert title="حدث خطأ!" message="حدث خطأ في الحصول على بيانات الأفراد" />;
  if (familiesError) return <ErrorAlert title="حدث خطأ!" message="حدث خطأ في الحصول على بيانات العائلات" />;

  if (familiesLoading || membersLoading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 />
    </div>
  );

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
      <div className="font-arabic w-full">
        <div className="flex flex-row gap-2 p-4">
          <BurgerMenu 
            onAddFamily={() => {setIsAddingFamily(true)}}
            onCreatePerson={() => {setIsCreatingPerson(true)}}
          />
        </div>
         <Suspense>
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
         </Suspense>
      </div>
    );
}