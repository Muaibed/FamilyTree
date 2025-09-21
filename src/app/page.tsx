"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { FamilyWithRootPerson } from "@/types/family";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family`,
    fetcher
  );
  
  useEffect(() => {
    if (session && data) {
      const filteredData = data?.filter((f) => f.ownerId === session.user.id);
      setFamilies(filteredData)
    }
  }, [data])
  
  if (familiesError) return <ErrorAlert title="حدث خطأ!"/>
  if (familiesLoading) return <div className="flex flex-col items-center justify-center h-screen"><Loader2 /></div>

  if (!families) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-4xl">
        No Families to Display!
      </div>
    )
  }


  return (
    <div className="font-arabic">
      <div className="absolute z-55">
      <div className="flex items-center-safe justify-center-safe w-full h-screen">

      <form onSubmit={handleRedirect} className="space-y-4">
        <select name="familyId" className="border rounded-lg p-2">
          <option value="">Select a family</option>
          {families && families.filter((f) => f.isDisplayed === true).map((f) => (
            <option key={f.id} value={f.id} className="text-black">
              {f.name}
            </option>
          ))}
        </select>

        <Button
          type="submit"
        >
          Go to Family
        </Button>
      </form>
      </div>
    </div>
    </div>
  );
}
