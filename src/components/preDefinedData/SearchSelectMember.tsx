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
}: {
  options: Option[];
  placeholder: string;
  selectedMemberId?: string;
  onChange: (value: string | null) => void;
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
  // const { data: members = [], isLoading: membersLoading, isError: membersError } = useQuery({
  //   queryKey: ["members"],
  //   queryFn: getMembers,
  // });

  // useEffect(() => {
  //   if (members) {
  //     const options = members
  //       .filter((m) => {
  //         return !gender || m.gender === gender
  //       })
  //       .map((m) => {
  //         return {
  //           id: m.id,
  //           value: m.fullName,
  //           label: m.firstName,
  //         };
  //       });
  //     setOptions(options);
  //   }
  // }, [members]);

  // if (membersLoading || memberLoading) return <div className="flex items-center justify-center w-full h-screen">
  //     <Loader2 />
  // </div>

  // if (membersError || !members) {
  //     return <div>
  //         <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات"/>
  //     </div>
  // }

  return (
    <div>
      <SearchSelect
        options={options}
        selected={selectedMember}
        onSelect={(option: Option) => {
          // const member = members.find((m: Person) => m.id === option.id);
          // if (member) {
          //   setSelectedMember(option);
          //   onChange(member.id);
          // }
          // const memberOption = options.find((o: Option) => o.id === option.id);
          if (option) {
            onChange(option.id);
            setSelectedMember(option);
          }
        }}
        placeholder={placeholder || "اختر"}
      />
    </div>
  );
}
