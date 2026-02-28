"use client"

import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import SearchSelect from "../ui/SearchSelect";
import { getFamily } from "@/lib/queries/families";
import { useQuery } from "@tanstack/react-query";

type FamilySelectProps = {
  options: Option[];
  selectedFamilyId?: string;
  onChange: (value: string | null) => void;
  placeholder?: string;
};

export default function SearchSelectFamily({
  options,
  selectedFamilyId,
  onChange,
  placeholder,
}: FamilySelectProps) {
  const [selectedFamily, setSelectedFamily] = useState<Option | undefined>(
    undefined
  );

  const { data: family, isLoading: familyLoading, error: familyError } = useQuery({
    queryKey: ["families", selectedFamilyId],
    queryFn: () => getFamily(selectedFamilyId!),
    enabled: !!selectedFamilyId,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (family)
      setSelectedFamily({ id: family.id, value: family.name })
  }, [family])

  if (familyError) {
    return (
      <div>
        لا توجد عائلات
      </div>
    )
  }

  if (familyLoading) {
    return (
      <div>
        جار التحميل
      </div>
    )
  }


  return (
    <div>
      <SearchSelect
        options={options}
        selected={selectedFamily}
        onSelect={(option: Option) => {
          if (option) {
            onChange(option.id);
            setSelectedFamily(option);
            sessionStorage.setItem("selectedFamily", option.id)
          }
        }}
        placeholder={placeholder || "اختر العائلة"}
      />
    </div>
  );
}
