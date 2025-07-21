import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import Select from "../ui/Select";

type GenderSelectProps = {
  selected: "MALE" | "FEMALE" | undefined;
  onChange: (value: "MALE" | "FEMALE") => void;
};

export default function SelectGender({
  selected,
  onChange,
}: GenderSelectProps) {
  const options: Option[] = [
    { id: "MALE", value: "ذكر" },
    { id: "FEMALE", value: "أنثى" },
  ];
  const [selectedGender, setSelectedGender] = useState<Option | undefined>(
    undefined
  );

  useEffect(() => {
    if (selected)
      setSelectedGender({
        id: selected,
        value: selected === "MALE" ? "ذكر" : "أنثى",
      });
  }, [selected]);

  return (
    <div>
      <Select
        options={options}
        selected={selectedGender}
        onSelect={(option: Option) => {
          setSelectedGender(option);
          onChange(option.id as "MALE" | "FEMALE");
        }}
        placeholder="اختر الجنس"
      />
    </div>
  );
}
