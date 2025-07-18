"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Option } from "@/types/ui";
import SearchSelect from "@/components/client/SearchSelect";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import {
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import DatePicker from "@/components/ui/datePicker";

const PersonChangeRequestForm = () => {
  const session = useSession()

  const { members, isLoading, error, mutate } = useMembersContext();

  const searchParams = useSearchParams();
  const personId = searchParams.get("personId");
  const person = personId ? members.find((m) => m.id === personId) : undefined;

  const [requesterId, setRequesterId] = useState<string | undefined>(session.data?.user.id);
  const [requesterName, setRequesterName] = useState(session.data?.user.name);
  const [requesterPhone, setRequesterPhone] = useState(session.data?.user.phone);
  const [firstName, setFirstName] = useState(person?.firstName);
  const [family, setFamily] = useState<FamilyWithRootPerson | undefined>(
    person?.family
  );
  const [gender, setGender] = useState<"MALE" | "FEMALE">(person?.gender ?? "MALE");
  const [selectedFather, setSelectedFather] = useState<PersonWithRelations | undefined>(
    person?.fatherId ? members.find((m) => m.id === person.fatherId) : undefined
  );
  const [selectedMother, setSelectedMother] = useState<PersonWithRelations | undefined>(
    person?.motherId ? members.find((m) => m.id === person.motherId) : undefined
  );
  const [deathDate, setDeathDate] = useState<Date | undefined>(
    person?.deathDate ? person.deathDate : undefined
  );
  const [familyOptions, setFamilyOptions] = useState<Option[]>();
  const [fatherOptions, setFatherOptions] = useState<Option[]>();
  const [motherOptions, setMotherOptions] = useState<Option[]>();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: families,
    isLoading: familiesLoading,
    error: familiesError,
    mutate: mutateFamilies,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    if (members) {
      const femaleOptions = Object.entries(members)
        .filter(([_, member]) => member.gender === "FEMALE")
        .map(([_, member]) => ({
          id: member.id,
          value: member.fullName
        }));
      setMotherOptions(femaleOptions);

      const maleOptions = Object.entries(members)
        .filter(([_, member]) => member.gender === "MALE")
        .map(([_, member]) => ({
          id: member.id,
          value: member.fullName
        }));
      setFatherOptions(maleOptions);
    }

    if (families) {
      const familyOptions = families.map((family: FamilyWithRootPerson) => ({
        id: family.id,
        value: family.name,
      }));

      setFamilyOptions(familyOptions);
    }

    if (selectedFather) {
      setFamily(selectedFather.family);
    }
  }, [members, person, families]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/changeRequest`, {
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
    });

    if (response.ok) {
      toast(`A change request for ${firstName} has been added successfully.`);
      window.location.href = "/";
    } else {
      toast(`Adding a change request for ${firstName} Failed. `);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }
  if (familiesLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }
  if (!families)
    return (
      <ErrorAlert
        title="Something wrong happened!"
        message="Families are missing."
      ></ErrorAlert>
    );
  if (!members)
    return (
      <ErrorAlert
        title="Something wrong happened!"
        message="Family members are missing."
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
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="الاسم الأول"
          required
          className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
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
            options={fatherOptions ?? []}
            selected={
              selectedFather
                ? {
                  id: selectedFather.id.toString(),
                    value: selectedFather.fullName,
                  }
                  : null
                }
                onSelect={(option) => {
                  const father = members.find(
                    (f) => f.id.toString() === option.id
              );
              if (father) {
                setSelectedFather(father);
              }
            }}
            placeholder="اختر الأب"
            />
          }
        {
          <SearchSelect
          options={motherOptions ?? []}
          selected={
            selectedMother
                ? {
                  id: selectedMother.id.toString(),
                  value: selectedMother.fullName,
                }
                : null
              }
              onSelect={(option) => {
                const mother = members.find(
                  (f) => f.id.toString() === option.id
              );
              if (mother) {
                setSelectedMother(mother);
              }
            }}
            placeholder="اختر الأم"
            />
          }
          {
            <SearchSelect
              options={familyOptions ?? []}
              selected={
                families.find((f: FamilyWithRootPerson) => f.id === family?.id) &&
                family?.id
                  ? {
                      id: family.id,
                      value: family.name,
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
          Submit
        </Button>
      </form>
    </div>
    </div>
  );
};

export default PersonChangeRequestForm;
