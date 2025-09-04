"use client";

import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import DatePicker from "../ui/datePicker";
import SelectGender from "../preDefinedData/SelectGender";
import SelectFamily from "../preDefinedData/SelectFamily";
import ErrorAlert from "../alerts/ErrorAlert";
import { Input } from "../ui/input";
import SearchSelectSpouse from "../preDefinedData/SearchSelectSpouse";
import { ScrollArea } from "../ui/scroll-area";

const AddChildForm = ({
  parent,
  onAdd,
}: {
  parent: PersonWithRelations;
  onAdd: any;
}) => {
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [family, setFamily] = useState<FamilyWithRootPerson | undefined>(undefined);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | undefined>(undefined);
  const [father, setFather] = useState<PersonWithRelations | undefined>();
  const [mother, setMother] = useState<PersonWithRelations | undefined>();
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [deathDate, setDeathDate] = useState<Date | undefined>(undefined);
  const [selectedSpouse, setSelectedSpouse] = useState<PersonWithRelations | undefined>(undefined);

  useEffect(() => {
    if (parent.gender === "MALE") {
      setFather(parent);
      setFamily(parent.family);
    } else if (parent.gender === "FEMALE") {
      setMother(parent);
      if (father) setFamily(father.family);
    }

  }, [father]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        familyId: family?.id,
        gender,
        birthDate,
        deathDate,
        fatherId: father?.id,
        motherId: mother?.id,
      }),
    });

    if (response.ok) {
      toast(`${firstName} has been added successfully.`);
      setFirstName("");
      setGender(undefined);
      onAdd();
    } else {
      toast(`Adding ${firstName} Failed.`);
    }
  };

  if (!parent) return <ErrorAlert title="حدث خطأ"/>

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-md">
      <div className="flex items-center justify-center w-full">
      <h2 className="text-2xl font-semibold mb-4">
        إضافة ابن
      </h2>
      </div>
      <ScrollArea className="max-h-[100vh] md:max-h-[600px] overflow-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="الاسم الأول" onChange={(e) => setFirstName(e.target.value)} required dir="rtl"/>

        <SelectGender selected={gender} onChange={setGender}/>

        <SearchSelectSpouse
            placeholder={parent.gender === "MALE" ? "اختر الأم" : "اختر الأب" }
            person={parent} 
            spouse={selectedSpouse} 
            onChange={(spouse) => {
              setSelectedSpouse; 
              parent.gender == "MALE"
                  ? setMother(spouse)
                  : setFather(spouse);
              }} 
        />

        <SelectFamily selected={family} onChange={setFamily}/>

        <DatePicker placeholder="تاريخ الميلاد (اختياري)" selectedDate={birthDate} onSubmit={(date) => setBirthDate(date)}/>
        <DatePicker placeholder="تاريخ الوفاة (اختياري)" selectedDate={deathDate} onSubmit={(date) => setDeathDate(date)}/>

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

export default AddChildForm;
