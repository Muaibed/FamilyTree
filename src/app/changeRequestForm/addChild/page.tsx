"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Option } from "@/types/ui";
import useSWR from "swr";
import SearchSelect from "@/components/client/SearchSelect";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import DatePicker from "@/components/ui/datePicker";

const AddChild = () => {
  const session = useSession()

  const { members, isLoading:membersLoading, error:membersError, mutate: mutateMembers } = useMembersContext();

  const searchParams = useSearchParams();
  const parentId = searchParams.get("parentId");
  const parent = parentId ? members.find((m: PersonWithRelations) => m.id === parentId) : undefined;

  
  const [requesterId, setRequesterId] = useState<string | undefined>(session.data?.user.id);
  const [requesterName, setRequesterName] = useState(session.data?.user.name);
  const [requesterPhone, setRequesterPhone] = useState(session.data?.user.phone);
  const [firstName, setFirstName] = useState("");
  const [family, setFamily] = useState<FamilyWithRootPerson | undefined>(parent?.family)
  const [gender, setGender] = useState<"MALE" | "FEMALE">(parent?.gender ?? "MALE");
  const [father, setFather] = useState<PersonWithRelations | undefined>();
  const [mother, setMother] = useState<PersonWithRelations | undefined>();
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [deathDate, setDeathDate] = useState<Date | undefined>();
  const [familyOptions, setFamilyOptions] = useState<Option[]>();
  const [spouseOptions, setSpouseOptions] = useState<Option[]>();
  const [selectedSpouse, setSelectedSpouse] = useState<PersonWithRelations | undefined>();
  
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
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
          const options = parent.maleSpouses.map((s) => {
            return {
              id: s.femaleId,
              value: s.female.fullName,
            };
          });
          setSpouseOptions(options);
        } else if (parent.gender === "FEMALE") {
          setMother(parent);
          if (father) setFamily(parent.family);
            const options = parent.femaleSpouses.map((s) => {
            return {
              id: s.maleId,
              value: s.male.fullName
            };
          });
          setSpouseOptions(options);
        }
    }
        if (families) {
            const familyOptions = families.map((family: FamilyWithRootPerson) => ({
              id: family.id,
              value: family.name,
            }));
            setFamilyOptions(familyOptions);
        }
  }, [members, father, parent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/changeRequest`, {
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
    });

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
        return (
            <ErrorAlert title="No Parent is Selected!">
            </ErrorAlert>
        )
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
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="الاسم الأول"
          required
          className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {
          <SearchSelect
            options={familyOptions ?? []}
            selected={
              families.find((f: FamilyWithRootPerson) => f.id === family?.id) &&
              family?.id
                ? {
                    id: family.id,
                    value: family.name
                  }
                : null
            }
            onSelect={(option) => {
            const family = families.find((f: FamilyWithRootPerson) => f.id === option.id)
                  if (family)
                    setFamily(family);
                }}
                placeholder="اختر العائلة"
          />
        }
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
          required
          className={`w-full justify-between px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring flex items-center`}
        >
          <option value="MALE">ذكر</option>
          <option value="FEMALE">أنثى</option>
        </select>

        {
          <SearchSelect
            options={spouseOptions ?? []}
            selected={
              selectedSpouse
                ? {
                    id: selectedSpouse.id.toString(),
                    value: selectedSpouse.fullName,
                  }
                : null
            }
            onSelect={(option) => {
              const spouseOption = spouseOptions?.find(
                (f) => f.id.toString() === option.id
              );
              const spouse = members.find((m:PersonWithRelations) => m.id === option.id)
              if (spouse) {
                setSelectedSpouse(spouse);
                parent.gender == "MALE"
                  ? setMother(spouse)
                  : setFather(spouse);
              }
            }}
            placeholder={
              parent?.gender == "MALE" ? "اختر الأم" : "اختر الأب"
            }
          />
        }

        <DatePicker placeholder="تاريخ الميلاد" selectedDate={birthDate} onSubmit={(date) => setBirthDate(date)}/>
        <DatePicker placeholder="تاريخ الوفاة" selectedDate={deathDate} onSubmit={(date) => setDeathDate(date)}/>
          
        {!session.data && 
          <div className="flex flex-col gap-2">
            <hr className="w-60 h-0.5 mx-auto my-4 bg-gray-200 dark:bg-gray-700" />
            <input 
              type="text" 
              value={requesterName ?? ""}
              onChange={(e) => setRequesterName(e.target.value)}
              placeholder="اسم مقدم الطلب"
              className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <input 
              type="text" 
              value={requesterPhone ?? ""}
              onChange={(e) => setRequesterPhone(e.target.value)}
              placeholder="رقم مقدم الطلب"
              className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        }
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
