"use client" 

import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import { Person } from "@/generated/prisma";
import { PersonWithRelations } from "@/types/family";
import SearchSelect from "../ui/SearchSelect";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";

export default function SearchSelectMember({
  placeholder,
  selected,
  onChange,
  gender,
}: {
  placeholder: string;
  selected?: Person | undefined;
  onChange: (value: PersonWithRelations) => void;
  gender?: "MALE" | "FEMALE";
}) {
  const [selectedMember, setSelectedMember] = useState<Option | undefined>(
    selected ? { id: selected.id, value: selected.fullName, label: selected.firstName } : undefined
  );
  const [options, setOptions] = useState<Option[]>([]);

  const familyId = sessionStorage.getItem('selectedFamily')
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: members, isLoading, error, mutate } = useSWR<PersonWithRelations[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/${familyId}`,
        fetcher
    );

    useEffect(() => {
      if (members) {
        const options = members
          .filter((m) => {
            return !gender || m.gender === gender
          })
          .map((m) => {
            return {
              id: m.id,
              value: m.fullName,
              label: m.firstName,
            };
          });
        setOptions(options);
      }
    }, [members]);
    
    if (isLoading) return <div className="flex items-center justify-center w-full h-screen">
        <Loader2 />
    </div>

    if (error || !members) {
        return <div>
            <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات"/>
        </div>
    }
    

  return (
    <div>
      <SearchSelect
        options={options}
        selected={selectedMember}
        onSelect={(option: Option) => {
          const member = members.find((m: Person) => m.id === option.id);
          if (member) {
            setSelectedMember(option);
            onChange(member);
          }
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
