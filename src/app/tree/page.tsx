"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense, useState } from "react";
import BurgerMenu from "@/components/client/BurgerMenu";
import { Modal } from "@/components/client/Modal";
import CreatePerson from "../pages/Person/CreatePerson";
import CreateFamily from "../pages/Family/CreateFamily";
import CreateFamilyTree from "../pages/FamilyTree/CreateFamilyTree";
import { useQuery } from "@tanstack/react-query";
import { getOwnerFamilyTrees } from "@/lib/queries/familyTrees";

export default function TreeHome() {
  const [isAddingFamily, setIsAddingFamily] = useState<boolean>(false);
  const [isCreatingPerson, setIsCreatingPerson] = useState<boolean>(false);
  const [isCreatingTree, setIsCreatingTree] = useState<boolean>(false);

  const { data: session } = useSession();

  const router = useRouter();

  const {
    data: trees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["owner-family-trees"],
    queryFn: getOwnerFamilyTrees,
  });

  const handleRedirect = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = formData.get("treeId") as string;

    if (id) {
      router.push(`/tree/${id}`);
    }
  };

  if (isError)
    return (
      <ErrorAlert
        title="حدث خطأ!"
        message="حدث خطأ في الحصول على بيانات الأشجار"
      />
    );

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 />
      </div>
    );

  return (
    <div className="font-arabic w-full">
      <div className="flex flex-row gap-2 p-4">
        <BurgerMenu
          onAddFamily={() => {
            setIsAddingFamily(true);
          }}
          onCreatePerson={() => {
            setIsCreatingPerson(true);
          }}
          onCreateTree={() => {
            setIsCreatingTree(true);
          }}
        />
      </div>
      <Suspense>
        <>
          <Modal
            isOpen={!!isCreatingPerson}
            onClose={() => setIsCreatingPerson(false)}
          >
            <CreatePerson onSuccess={() => setIsCreatingPerson(false)} />
          </Modal>
          <Modal
            isOpen={!!isAddingFamily}
            onClose={() => setIsAddingFamily(false)}
          >
            <CreateFamily onSuccess={() => setIsAddingFamily(false)} />
          </Modal>
          <Modal
            isOpen={!!isCreatingTree}
            onClose={() => setIsCreatingTree(false)}
          >
            <CreateFamilyTree onSuccess={() => setIsCreatingTree(false)} />
          </Modal>
        </>
        <div className="flex items-center-safe justify-center-safe h-screen w-full">
          <form
            onSubmit={handleRedirect}
            className="flex flex-col gap-4 justify-center items-center h-screen w-full"
          >
            <div className="w-full flex items-center justify-center">
              <select
                name="treeId"
                className="w-1/2 flex border rounded-lg p-2"
              >
                <option value="">اختر شجرة عائلية</option>
                {trees.map((t) => (
                  <option key={t.id} value={t.id} className="text-black">
                    {t.name}
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
