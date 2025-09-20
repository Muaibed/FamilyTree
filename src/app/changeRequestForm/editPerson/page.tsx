"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import DatePicker from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import SelectFamily from "@/components/preDefinedData/SelectFamily";
import SearchSelectMember from "@/components/preDefinedData/SearchSelectMember";
import SelectGender from "@/components/preDefinedData/SelectGender";

const PersonChangeRequestForm = () => {
  const session = useSession();

  const familyFromSessionStorage = sessionStorage.getItem("selectedFamily")

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: members, isLoading: membersLoading, error: membersError, mutate: mutateMembers } = useSWR<PersonWithRelations[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/${familyFromSessionStorage}`,
      fetcher
  );
  const searchParams = useSearchParams();
  const personId = searchParams.get("personId");
  const person = personId ? members?.find((m) => m.id === personId) : undefined;

  const [requesterId, setRequesterId] = useState<string | undefined>(
    session.data?.user.id
  );
  const [requesterName, setRequesterName] = useState(session.data?.user.name);
  const [requesterPhone, setRequesterPhone] = useState(
    session.data?.user.phone
  );
  const [firstName, setFirstName] = useState(person?.firstName);
  const [family, setFamily] = useState<FamilyWithRootPerson | undefined>(
    person?.family
  );
  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    person?.gender ?? "MALE"
  );
  const [selectedFather, setSelectedFather] = useState<
    PersonWithRelations | undefined
  >(
    person?.fatherId ? members?.find((m) => m.id === person.fatherId) : undefined
  );
  const [selectedMother, setSelectedMother] = useState<
    PersonWithRelations | undefined
  >(
    person?.motherId ? members?.find((m) => m.id === person.motherId) : undefined
  );
  const [deathDate, setDeathDate] = useState<Date | undefined>(
    person?.deathDate ? person.deathDate : undefined
  );

  const {
    data: families,
    isLoading: familiesLoading,
    error: familiesError,
    mutate: mutateFamilies,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    if (selectedFather) {
      setFamily(selectedFather.family);
    }
  }, [members, person, families]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/changeRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "UPDATE",
          targetModel: "PERSON",
          targetId: personId,
          dataJSON: {
            firstName,
            familyId: family?.id,
            gender,
            deathDate,
            fatherId: selectedFather?.id,
            motherId: selectedMother?.id,
          },
          requesterId,
          requesterName,
          requesterPhone,
        }),
      }
    );

    if (response.ok) {
      toast(`A change request for ${firstName} has been added successfully.`);
      window.location.href = "/";
    } else {
      toast(`Adding a change request for ${firstName} Failed. `);
    }
  };

  if (membersLoading || familiesLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  if (familiesError || membersError)
    return (
      <ErrorAlert
        title="!حدث خطأ"
      ></ErrorAlert>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            طلب تعديل معلومات {person?.firstName}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="الاسم الأول" onChange={(e) => setFirstName(e.target.value)} value={firstName} required dir="rtl"/>
        
        <SelectGender selected={gender} onChange={setGender}/>
                
        <SearchSelectMember
          placeholder="اختر الأب (اختياري)"
          selected={selectedFather}
          onChange={setSelectedFather}
          gender="MALE"
      />

      <SearchSelectMember
          placeholder="اختر الأم (اختياري)"
          selected={selectedMother}
          onChange={setSelectedMother}
          gender="MALE"
      />

      <SelectFamily selected={family} onChange={setFamily}/>
  
      <DatePicker placeholder="تاريخ الوفاة (اختياري)" selectedDate={deathDate} onSubmit={(date) => setDeathDate(date)}/>
        


          {!session.data && (
            <div className="flex flex-col gap-2">
              <hr className="w-60 h-0.5 mx-auto my-4 bg-gray-200 dark:bg-gray-700" />
               <Input type="text" placeholder="اسم مقدم الطلب (اختياري)" onChange={(e) => setRequesterName(e.target.value)} dir="rtl"/>
              <Input type="text" placeholder="رقم مقدم الطلب (اختياري)" onChange={(e) => setRequesterPhone(e.target.value)} dir="rtl"/>
            </div>
          )}
          <Button
            type="submit"
            className="w-full py-2 px-4 font-semibold"
          >
            تأكيد
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonChangeRequestForm;
