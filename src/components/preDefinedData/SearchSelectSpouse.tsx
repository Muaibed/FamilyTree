"use client"

import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import { Person } from "@/generated/prisma";
import { PersonWithRelations } from "@/types/family";
import SearchSelect from "../ui/SearchSelect";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import { useQuery } from "@tanstack/react-query";
import { getFamilyMembers } from "@/lib/queries/familyTreeMembers";

type SpouseSelectProps = {
  placeholder?: string;
  person: PersonWithRelations;
  spouse: PersonWithRelations | undefined;
  onChange: (value: PersonWithRelations) => void;
};

export default function SearchSelectSpouse({
  placeholder,
  person,
  spouse,
  onChange,
}: SpouseSelectProps) {
  const [selectedSpouse, setSelectedSpouse] = useState<Option | undefined>(
    undefined
  );
  const [spouseOptions, setSpouseOptions] = useState<Option[]>([]);

  const familyId = sessionStorage.getItem('selectedFamily');

  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ["family-members", familyId],
    queryFn: () => getFamilyMembers(familyId!),
    enabled: !!familyId,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader2 />
    </div>
  );

  if (isError || !members) {
    return (
      <div>
        <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات" />
      </div>
    );
  }

  useEffect(() => {
    if (person.gender === "MALE") {
      const options = person.maleSpouses.map((s) => {
        return {
          id: s.femaleId,
          value: s.female.fullName,
          label: s.female.firstName,
        };
      });
      setSpouseOptions(options);
    } else if (person.gender === "FEMALE") {
      const options = person.femaleSpouses.map((s) => {
        return {
          id: s.maleId,
          value: s.male.fullName,
          label: s.male.firstName,
        };
      });
      setSpouseOptions(options);
    }

    if (spouse) setSelectedSpouse({ id: spouse.id, value: spouse.fullName, label: spouse.firstName });
  }, [person, spouse]);

  return (
    <div>
      <SearchSelect
        options={spouseOptions}
        selected={selectedSpouse}
        onSelect={(option: Option) => {
          const spouse = members.find((m: Person) => m.id === option.id);
          if (spouse) {
            setSelectedSpouse(option);
            onChange(spouse);
          }
        }}
        placeholder={placeholder ? placeholder : "اختر"}
      />
    </div>
  );
}
