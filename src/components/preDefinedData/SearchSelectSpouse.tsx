import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import { Family, Person } from "@/generated/prisma";
import { PersonWithRelations } from "@/types/family";
import { useMembersContext } from "../client/MembersContextProvider";
import SearchSelect from "../ui/SearchSelect";

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

  const {
    members,
    isLoading,
    error,
    mutate: mutateMembers,
  } = useMembersContext();

  useEffect(() => {
    if (person.gender === "MALE") {
      const options = person.maleSpouses.map((s) => {
        return {
          id: s.femaleId,
          value: s.female.fullName,
        };
      });
      setSpouseOptions(options);
    } else if (person.gender === "FEMALE") {
      const options = person.femaleSpouses.map((s) => {
        return {
          id: s.maleId,
          value: s.male.fullName,
        };
      });
      setSpouseOptions(options);
    }

    if (spouse) setSelectedSpouse({ id: spouse.id, value: spouse.fullName });
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
