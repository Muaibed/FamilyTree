"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Option } from "@/types/ui";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import DatePicker from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import SelectGender from "@/components/preDefinedData/SelectGender";
import SearchSelectSpouse from "@/components/preDefinedData/SearchSelectSpouse";
import SelectFamily from "@/components/preDefinedData/SelectFamily";

const AddChild = () => {
  const session = useSession();

  const familyFromSessionStorage = sessionStorage.getItem("selectedFamily")

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data: members, isLoading: membersLoading, error: membersError, mutate: mutateMembers } = useSWR<PersonWithRelations[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/${familyFromSessionStorage}`,
        fetcher
    );

  const searchParams = useSearchParams();
  const parentId = searchParams.get("parentId");
  const parent = parentId
    ? members?.find((m: PersonWithRelations) => m.id === parentId)
    : undefined;

  const [requesterId, setRequesterId] = useState<string | undefined>(
    session.data?.user.id
  );
  const [requesterName, setRequesterName] = useState(session.data?.user.name);
  const [requesterPhone, setRequesterPhone] = useState(
    session.data?.user.phone
  );
  const [firstName, setFirstName] = useState("");
  const [family, setFamily] = useState<FamilyWithRootPerson | undefined>(undefined);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | undefined>(undefined);
  const [father, setFather] = useState<PersonWithRelations | undefined>();
  const [mother, setMother] = useState<PersonWithRelations | undefined>();
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [deathDate, setDeathDate] = useState<Date | undefined>();
  const [selectedSpouse, setSelectedSpouse] = useState<
    PersonWithRelations | undefined
  >();

  const {
    data: families,
    isLoading: familiesLoading,
    error: familiesError,
    mutate: mutateFamilies,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    if (parent && members) {
      if (parent.gender === "MALE") {
        setFather(parent);
        setFamily(parent.family);
      } else if (parent.gender === "FEMALE") {
        setMother(parent);
        if (father) setFamily(parent.family);
      }
    }
  }, [members, parent, father]);

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
          action: "ADD",
          targetModel: "PERSON",
          dataJSON: {
            firstName,
            fullName: firstName + " " + family?.name,
            familyId: family?.id,
            gender,
            birthDate,
            deathDate,
            fatherId: father?.id,
            motherId: mother?.id,
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
      toast(`Adding a change request for ${firstName} Failed.`);
    }
  };

  if (membersLoading || familiesLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }
  if (!families || familiesError)
    return (
      <ErrorAlert
        title="Something wrong happened!"
        message="Families are missing."
      ></ErrorAlert>
    );
  if (!members || membersError)
    return (
      <ErrorAlert
        title="Something wrong happened!"
        message="Family members are missing."
      ></ErrorAlert>
    );
  if (!parent) {
    return <ErrorAlert title="No Parent is Selected!"></ErrorAlert>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full">
          <h2 className="text-2xl font-semibold mb-4">
            طلب إضافة ابن لـ {parent.firstName}
          </h2>
        </div>
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

          {!session.data && (
            <div className="flex flex-col gap-2">
              <hr className="w-60 h-0.5 mx-auto my-4 bg-gray-200 dark:bg-gray-700" />
              <Input type="text" placeholder="اسم مقدم الطلب (اختياري)" onChange={(e) => setRequesterName(e.target.value)} dir="rtl"/>
              <Input type="text" placeholder="رقم مقدم الطلب (اختياري)" onChange={(e) => setRequesterPhone(e.target.value)} dir="rtl"/>
            </div>
          )}
          <Button
            type="submit"
            className="w-full py-2 px-4 font-semibold rounded-md transition"
          >
            تأكيد
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddChild;
