import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import { Person } from "@/generated/prisma";
import { useMembersContext } from "../client/MembersContextProvider";
import { PersonWithRelations } from "@/types/family";
import SearchSelect from "../ui/SearchSelect";

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

  const {
    members,
    isLoading,
    error,
    mutate: mutateMembers,
  } = useMembersContext();

  useEffect(() => {
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
  }, [members]);

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
