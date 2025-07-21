'use client'

import useSWR from "swr";
import { FamilyTableClient } from "./FamilyTableClient";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/alerts/ErrorAlert";

export default function Page() {

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, isLoading, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/changeRequest`, fetcher)

  if (isLoading) return <div className="flex items-center justify-center w-full h-screen">
    <Loader2 />
  </div>;
  if (error) return <ErrorAlert title="!حدث خطأ"/>;

  return (
    <div className="container mx-auto py-10">
      <FamilyTableClient data={data} onChange={mutate} />
    </div>
  );
}
