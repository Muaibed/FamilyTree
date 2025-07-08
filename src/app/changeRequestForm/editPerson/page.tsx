"use client";

import { Family, Person } from "@/types/family";
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

const PersonChangeRequestForm = () => {
  const session = useSession()

  const { members, isLoading, error, mutate } = useMembersContext();

  const searchParams = useSearchParams();
  const personId = searchParams.get("personId");
  const person = personId ? members?.people[personId] : undefined;

  const [requesterId, setRequesterId] = useState<string | undefined>(session.data?.user.id);
  const [requesterName, setRequesterName] = useState(session.data?.user.name);
  const [requesterPhone, setRequesterPhone] = useState(session.data?.user.phone);
  const [firstName, setFirstName] = useState(person?.name);
  const [familyId, setFamilyId] = useState<string | undefined>(
    person?.family.id.toString()
  );
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [selectedFather, setSelectedFather] = useState<Person | undefined>(
    person?.fatherId ? members.people[person.fatherId] : undefined
  );
  const [selectedMother, setSelectedMother] = useState<Person | undefined>(
    person?.motherId ? members.people[person.motherId] : undefined
  );
  const [birthDate, setbirthDate] = useState<string | undefined>(
    person?.birthDate
  );
  const [deathDate, setDeathDate] = useState<string | undefined>(
    person?.deathDate
  );
  const [familyOptions, setFamilyOptions] = useState<Option[]>();
  const [fatherOptions, setFatherOptions] = useState<Option[]>();
  const [motherOptions, setMonterOptions] = useState<Option[]>();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: families,
    isLoading: familiesLoading,
    error: familiesError,
    mutate: mutateFamilies,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    if (members) {
      console.log("members1: " + members);
      const femaleOptions = Object.entries(members.people)
        .filter(([_, member]) => member.gender === "FEMALE")
        .map(([memberId, member]) => ({
          id: memberId,
          value: memberId + " " + member.name + " " + member.family.name,
        }));
      setMonterOptions(femaleOptions);

      const maleOptions = Object.entries(members.people)
        .filter(([_, member]) => member.gender === "MALE")
        .map(([memberId, member]) => ({
          id: memberId,
          value: memberId + " " + member.name + " " + member.family.name,
        }));
      setFatherOptions(maleOptions);
    }

    if (families) {
      const familyOptions = families.map((family: Family) => ({
        id: family.id,
        value: family.name,
      }));

      setFamilyOptions(familyOptions);
    }

    if (selectedFather) {
      setFamilyId(selectedFather.family.id.toString());
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
          familyId,
          gender,
          birthDate,
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
      window.location.href = "/changeRequestForm";
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Create Change Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {
          <SearchSelect
            options={familyOptions ?? []}
            selected={
              families.find((f: Family) => f.id === Number(familyId)) &&
              familyId
                ? {
                    id: familyId.toString(),
                    value: families.find(
                      (f: Family) => f.id === Number(familyId)
                    )!.name,
                  }
                : null
            }
            onSelect={(option) => {
              setFamilyId(option.id);
              console.log("selected family:" + option.id);
            }}
            placeholder="Select Family"
          />
        }
        {
          <SearchSelect
            options={fatherOptions ?? []}
            selected={
              selectedFather
                ? {
                    id: selectedFather.id.toString(),
                    value: selectedFather.name,
                  }
                : null
            }
            onSelect={(option) => {
              const father = fatherOptions?.find(
                (f) => f.id.toString() === option.id
              );
              if (father) {
                setSelectedFather(members.people[father.id]);
              }
            }}
            placeholder="Select a Father"
          />
        }
        {
          <SearchSelect
            options={motherOptions ?? []}
            selected={
              selectedMother
                ? {
                    id: selectedMother.id.toString(),
                    value: selectedMother.name,
                  }
                : null
            }
            onSelect={(option) => {
              const mother = motherOptions?.find(
                (f) => f.id.toString() === option.id
              );
              if (mother) {
                setSelectedMother(members.people[mother.id]);
              }
            }}
            placeholder="Select a Mother"
          />
        }
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setbirthDate(e.target.value)}
          placeholder="Birth Date"
          className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <input
          type="date"
          value={deathDate}
          onChange={(e) => setDeathDate(e.target.value)}
          placeholder="Death Date"
          className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {!session.data && 
          <div className="flex flex-col gap-2">
            <hr className="w-60 h-0.5 mx-auto my-4 bg-gray-200 dark:bg-gray-700" />
            <input 
              type="text" 
              value={requesterName ?? ""}
              onChange={(e) => setRequesterName(e.target.value)}
              placeholder="Requester Name (optional)"
              className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <input 
              type="text" 
              value={requesterPhone ?? ""}
              onChange={(e) => setRequesterPhone(e.target.value)}
              placeholder="Requester Phone (optional)"
              className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        }
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-md transition"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PersonChangeRequestForm;
