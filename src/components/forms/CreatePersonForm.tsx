"use client";

import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SearchSelect from "../client/SearchSelect";
import { Option } from "@/types/ui";
import useSWR from "swr";
import { Family, Person } from "@/generated/prisma";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import DatePicker from "../ui/datePicker";
import * as React from "react"
import { Button } from "../ui/button";

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
  const [family, setFamily] = useState<Family | undefined>(undefined);
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [selectedFather, setSelectedFather] = useState<PersonWithRelations | undefined>(
    FID ? members.find((m) => m.id === FID) : undefined
  );
  const [selectedMother, setSelectedMother] = useState<PersonWithRelations | undefined>(
    MID ? members.find((m) => m.id === MID) : undefined
  );
  const [birthDate, setBirthDate] = React.useState<Date>()
  const [deathDate, setDeathDate] = React.useState<Date>()
  const [familyOptions, setFamilyOptions] = useState<Option[]>();
  const [fatherOptions, setFatherOptions] = useState<Option[]>();
  const [motherOptions, setMotherOptions] = useState<Option[]>();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: families,
    isLoading,
    error,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    const motherOptions = members
      .filter((member) => member.gender === "FEMALE")
      .map((member) => ({
        id: member.id,
        value: member.id + " " + member.firstName + " " + member.family.name,
      }));
    setMotherOptions(motherOptions);

    const fatherOptions = Object.entries(members)
      .filter(([_, member]) => member.gender === "MALE")
      .map(([_, member]) => ({
        id: member.id,
        value: member.fullName,
      }));
    setFatherOptions(fatherOptions);

    const familyOptions = families.map((family: Family) => ({
      id: family.id,
      value: family.name,
    }));
    setFamilyOptions(familyOptions);

    setFamily(selectedFather?.family)
  }, [members, selectedFather]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        fullName: firstName + " " + family?.name,
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
      setGender("MALE");
      setSelectedFather(undefined);
      setSelectedMother(undefined);
      setBirthDate(undefined);
      setDeathDate(undefined);
      onCreate();
    } else {
      toast(`Creating ${firstName} Failed.`);
    }
  };

  if (isLoading) return <Loader2 />
  if (error) return <ErrorAlert title="Something went wrong!" message="Cannot get the members."/>

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Create Person
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
          required
          className={`w-full justify-between px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring flex items-center`}
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
                    id: selectedFather.id,
                    value: selectedFather.fullName,
                  }
                : null
            }
            onSelect={(option) => {
              const father = members.find((m: PersonWithRelations) => m.id === option.id)
              if (father) {
                setSelectedFather(father);
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
                    value: selectedMother.fullName,
                  }
                : null
            }
            onSelect={(option) => {
              const mother = members.find((m) => m.id === option.id)
              if (mother) {
                setSelectedMother(mother);
              }
            }}
            placeholder="Select a Mother"
          />
        }
        {
          <SearchSelect
            options={familyOptions ?? []}
            selected={
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
            placeholder="Select Family"
          />
        }
        <DatePicker placeholder="Birth Date" selectedDate={birthDate} onSubmit={(date) => setBirthDate(date)}/>
        <DatePicker placeholder="Death Date" selectedDate={deathDate} onSubmit={(date) => setDeathDate(date)}/>

        <Button
          type="submit"
          className="w-full py-2 px-4"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreatePersonForm;
