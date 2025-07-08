"use client";

import { FamilyTreeData, Person } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SearchSelect from "../client/SearchSelect";
import { Option } from "@/types/ui";
import useSWR from "swr";
import { Family } from "@/generated/prisma";

const CreatePersonForm = ({
  FID,
  MID,
  members,
  onCreate,
}: {
  FID?: string;
  MID?: string;
  members: FamilyTreeData;
  onCreate: any;
}) => {
  const [firstName, setFirstName] = useState("");
  const [familyId, setFamilyId] = useState<string | undefined>("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [selectedFather, setSelectedFather] = useState<Person | undefined>(
    FID ? members.people[FID] : undefined
  );
  const [selectedMother, setSelectedMother] = useState<Person | undefined>(
    MID ? members.people[MID] : undefined
  );
  const [birthDate, setBirthDate] = useState<string | undefined>();
  const [deathDate, setDeathDate] = useState<string | undefined>();
  const [familyOptions, setFamilyOptions] = useState<Option[]>();
  const [fatherOptions, setFatherOptions] = useState<Option[]>();
  const [motherOptions, setMonterOptions] = useState<Option[]>();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: families,
    isLoading,
    error,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    const motherOptions = Object.entries(members.people)
      .filter(([_, member]) => member.gender === "FEMALE")
      .map(([memberId, member]) => ({
        id: memberId,
        value: memberId + " " + member.name + " " + member.family.name,
      }));
    setMonterOptions(motherOptions);

    const fatherOptions = Object.entries(members.people)
      .filter(([_, member]) => member.gender === "MALE")
      .map(([memberId, member]) => ({
        id: memberId,
        value: memberId + " " + member.name + " " + member.family.name,
      }));
    setFatherOptions(fatherOptions);

    const familyOptions = families.map((family: Family) => ({
      id: family.id,
      value: family.name,
    }));
    setFamilyOptions(familyOptions);
  }, [members]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        familyId,
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
      setGender("MALE");
      setSelectedFather(undefined);
      setSelectedMother(undefined);
      setBirthDate(undefined);
      setDeathDate(undefined);
      onCreate();
    } else {
      const errorData = await response.json();
      toast(`Creating ${firstName} Failed.`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Create Person
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
            }}
            placeholder="Select Family"
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
              const mother = fatherOptions?.find(
                (f) => f.id.toString() === option.id
              );
              if (mother) {
                setSelectedMother(members.people[mother.id]);
              }
            }}
            placeholder="Select a Mother"
          />
        }
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="Birth Date"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={deathDate}
          onChange={(e) => setDeathDate(e.target.value)}
          placeholder="Death Date"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-md transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePersonForm;
