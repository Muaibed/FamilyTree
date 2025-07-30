import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import Select from "../ui/Select";
import { Family } from "@/generated/prisma";
import useSWR from "swr";
import { FamilyWithRootPerson } from "@/types/family";

type FamilySelectProps = {
  selected: FamilyWithRootPerson | undefined;
  onChange: (value: FamilyWithRootPerson) => void;
};

export default function SelectFamily({
  selected,
  onChange,
}: FamilySelectProps) {
  const [selectedFamily, setSelectedFamily] = useState<Option | undefined>(
    undefined
  );

  useEffect(() => {
    if (selected) setSelectedFamily({ id: selected.id, value: selected.name });
  }, [selected]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/family`,
    fetcher
  );

  const options = data.map((family: Family) => ({
    id: family.id,
    value: family.name,
  }));

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
