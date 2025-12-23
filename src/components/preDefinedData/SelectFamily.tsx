"use client" 

import { Option } from "@/types/ui";
import { useEffect, useMemo, useState } from "react";
import Select from "../ui/Select";
import { Family } from "@/generated/prisma";
import useSWR from "swr";
import { FamilyWithRootPerson } from "@/types/family";

type FamilySelectProps = {
  selected: FamilyWithRootPerson | undefined;
  onChange: (value: FamilyWithRootPerson) => void;
  isDisplayed?: boolean;
};

export default function SelectFamily({
  selected,
  onChange,
  isDisplayed,
}: FamilySelectProps) {
  const [selectedFamily, setSelectedFamily] = useState<Option | undefined>(
    undefined
  );
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (selected) setSelectedFamily({ id: selected.id, value: selected.name });

    if (data) {
      let options;
      if (isDisplayed) {
        options = data.filter((f:Family) => f.isDisplayed === isDisplayed)
                      .map((family: Family) => ({
                        id: family.id,
                        value: family.name,
                      }));
      } else 
        options = data.map((family: Family) => ({
            id: family.id,
            value: family.name,
          }));;

      setOptions(options)
    }
  }, [selected]);

  const viewedFamily = sessionStorage.getItem('selectedFamily')
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, mutate } = useSWR<FamilyWithRootPerson[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family/relatedFamilies/${viewedFamily}`,
    fetcher
  );

  const filteredData = useMemo(() => {
    if (data) {
      if (isDisplayed)
        return data.filter((f:Family) => f.isDisplayed === isDisplayed)

      return data
    }
  }, [isDisplayed, data]);

  if (error || !data) {
    return (
      <div>
        لا توجد عائلات
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        جار التحميل
      </div>
    )
  }


  return (
    <div>
      <Select
        options={options}
        selected={selectedFamily}
        onSelect={(option: Option) => {
          const family = data.find((f: Family) => f.id === option.id);
          if (family) {
            setSelectedFamily(option);
            onChange(family);
            sessionStorage.setItem("selectedFamily", family.id)
          }
        }}
        placeholder="اختر العائلة"
      />
    </div>
  );
}
