'use client' 

import FamilyTreeView from "@/components/client/FamilyTreeView";
import ThemeToggle from "@/theme/theme-toggle";
import useSWR from "swr";

export default function Home() {  
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/json`, fetcher)

  return (
    <div className="relative w-full h-screen bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226]">
      <ThemeToggle />
      <FamilyTreeView data={data} onChange={mutate} />
    </div>
  );
}
