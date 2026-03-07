"use client";

import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import SearchSelect from "../ui/SearchSelect";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import { useQuery } from "@tanstack/react-query";
import { getPerson } from "@/lib/queries/persons";

export default function SearchSelectMember({
  options,
  placeholder,
  selectedMemberId,
  onChange,
  emptyFallBack,
}: {
  options: Option[];
  placeholder: string;
  selectedMemberId?: string;
  onChange: (value: string | null) => void;
  emptyFallBack?: string;
}) {
  const { data: member, isLoading: memberLoading } = useQuery({
    queryKey: ["members", selectedMemberId],
    queryFn: () => getPerson(selectedMemberId!),
    enabled: !!selectedMemberId,
    placeholderData: (prev) => prev,
  });

  const [selectedMember, setSelectedMember] = useState<Option | undefined>();

  useEffect(() => {
    if (member)
      setSelectedMember({ id: member.id, value: member.fullName, label: member.firstName })
  }, [member])

  return (
    <div>
      <SearchSelect
        options={options}
        selected={selectedMember}
        onSelect={(option: Option) => {

          if (option) {
            onChange(option.id);
            setSelectedMember(option);
          }
        }}
        placeholder={placeholder || "اختر"}
        emptyFallBack={emptyFallBack}
      />
    </div>
  );
}
