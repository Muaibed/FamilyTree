"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { FamilyWithRootPerson } from "@/types/family";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BurgerMenu from "@/components/client/BurgerMenu";

export default function Home() {
  const [families, setFamilies] = useState<FamilyWithRootPerson[] | null>();

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
  
  const { data: session, status } = useSession();
  const { data, isLoading: familiesLoading, error: familiesError, mutate: mutateFamilies } = useSWR<FamilyWithRootPerson[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family/owner`,
    fetcher
  );
  
  useEffect(() => {
    if (session && data) {
      setFamilies(data)
    }
  }, [data])
  
  if (familiesError) return <ErrorAlert title="حدث خطأ!"/>
  if (familiesLoading) return <div className="flex flex-col items-center justify-center h-screen"><Loader2 /></div>

  if (!families) {
    return (
      <>
        <div className="flex flex-row gap-2 p-4">
        <BurgerMenu />
        </div>
        <div className="flex justify-center items-center h-screen w-full text-4xl">
          No Families to Display!
        </div>
      </>
    )
  }


  return (
    <div className="font-arabic w-full">
      <div className="flex flex-row gap-2 p-4">
        <BurgerMenu />
      </div>
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
