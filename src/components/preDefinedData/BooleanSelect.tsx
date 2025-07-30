import { Option } from "@/types/ui";
import { useEffect, useState } from "react";
import Select from "../ui/Select";

type BooleanSelectProps = {
  placeholder: string;
  selected: boolean | undefined;
  onChange: (value: "true" | "false") => void;
};

export default function SelectBoolean({
  placeholder,
  selected,
  onChange,
}: BooleanSelectProps) {
  const options: Option[] = [
    { id: "true", value: "نعم" },
    { id: "false", value: "لا" },
  ];
  const [selectedBoolean, setSelectedBoolean] = useState<Option | undefined>(
    undefined
  );

  useEffect(() => {
    if (selected)
      setSelectedBoolean({
        id: selected.toString(),
        value: selected ? "نعم" : "لا",
      });
  }, [selected]);

  return (
    <div>
      <Select
        options={options}
        selected={selectedBoolean}
        onSelect={(option: Option) => {
          setSelectedBoolean(option);
          onChange(option.id as "true" | "false");
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
