"use client";

import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Family } from "@/generated/prisma";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import DatePicker from "../ui/datePicker";
import * as React from "react"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import SelectFamily from "../preDefinedData/SelectFamily";
import SelectGender from "../preDefinedData/SelectGender";

const CreatePersonForm = ({
  FID,
  MID,
  members,
  onCreate,
}: {
  FID?: string;
  MID?: string;
  members: PersonWithRelations[];
  onCreate: any;
}) => {
  const [firstName, setFirstName] = useState("");
  const [family, setFamily] = useState<FamilyWithRootPerson | undefined>(undefined);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | undefined>(undefined);
  const [selectedFather, setSelectedFather] = useState<PersonWithRelations | undefined>(
    FID ? members.find((m) => m.id === FID) : undefined
  );
  const [selectedMother, setSelectedMother] = useState<PersonWithRelations | undefined>(
    MID ? members.find((m) => m.id === MID) : undefined
  );
  const [birthDate, setBirthDate] = React.useState<Date>()
  const [deathDate, setDeathDate] = React.useState<Date>()

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: families,
    isLoading,
    error,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    setFamily(selectedFather?.family)
  }, [selectedFather]);

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
        fatherId: selectedFather?.id,
        motherId: selectedMother?.id,
        birthDate,
        deathDate,
      }),
    });

    if (response.ok) {
      toast(`${firstName} has been created successfully.`);
      setFirstName("");
      setGender(undefined)
      setSelectedFather(undefined);
      setSelectedMother(undefined);
      setBirthDate(undefined);
      setDeathDate(undefined);
      onCreate();
    } else {
      toast(`Creating ${firstName} Failed.`);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center w-full h-screen">
    <Loader2 />
  </div>
  if (error || !families || !members) return <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات"/>

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4">
          إضافة فرد
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="الاسم الأول" onChange={(e) => setFirstName(e.target.value)} required dir="rtl"/>
        
        <SelectGender selected={gender} onChange={setGender}/>

        <SearchSelectMember
            placeholder="اختر الأب (اختياري)"
            onChange={setSelectedFather}
            gender="MALE"
        />

        <SearchSelectMember
            placeholder="اختر الأم (اختياري)"
            onChange={setSelectedMother}
            gender="MALE"
        />

        <SelectFamily selected={family} onChange={setFamily}/>
        
        <DatePicker placeholder="تاريخ الميلاد (اختياري)" selectedDate={birthDate} onSubmit={(date) => setBirthDate(date)}/>
        <DatePicker placeholder="تاريخ الوفاة (اختياري)" selectedDate={deathDate} onSubmit={(date) => setDeathDate(date)}/>

        <Button
          type="submit"
          className="w-full py-2 px-4"
        >
          تأكيد
        </Button>
      </form>
    </div>
  );
};

export default CreatePersonForm;
