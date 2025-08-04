"use client";

import { toast } from "sonner";
import { useState } from "react";
import { PersonWithRelations } from "@/types/family";
import { Button } from "../ui/button";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import { Person } from "@/generated/prisma";
import BooleanSelect from "../preDefinedData/BooleanSelect";
import { ScrollArea } from "../ui/scroll-area";

const AddSpouseForm = ({
  person,
  onAdd,
}: {
  person: PersonWithRelations;
  onAdd: any;
}) => {
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [selectedSpouse, setSelectedSpouse] = useState<Person | undefined>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/spouseRelationship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maleId: person.gender === "MALE" ? person.id : selectedSpouse?.id,
        femaleId: person.gender === "FEMALE" ? person.id : selectedSpouse?.id,
        isActive,
      }),
    });

    if (response.ok) {
      toast(`${selectedSpouse?.firstName} has been added successfully.`);
      setSelectedSpouse(undefined);
      onAdd(selectedSpouse);
    } else {
      toast(`Adding ${selectedSpouse?.firstName} Failed.`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-md">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
          إضافة زوج
        </h2>
      </div>
      <ScrollArea className="max-h-[100vh] md:max-h-[600px] overflow-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SearchSelectMember
          placeholder="اختر زوج"
          onChange={setSelectedSpouse}
          gender={person.gender === "MALE" ? "FEMALE" : "MALE"}
        />

        <BooleanSelect
          placeholder="العلاقة مستمرة؟"
          selected={isActive}
          onChange={(strBool: string) => {
            strBool === "true" ? setIsActive(true) : setIsActive(false);
          }}
        />
        <Button
          type="submit"
          className="w-full py-2 px-4 font-semibold rounded-md transition"
        >
          تأكيد
        </Button>
      </form>
      </ScrollArea>
    </div>
  );
};

export default AddSpouseForm;
