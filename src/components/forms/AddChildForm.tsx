"use client";

import { PersonWithRelations } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SearchSelect from "../client/SearchSelect";
import { Option } from "@/types/ui";
import useSWR from "swr";
import { Family } from "@/generated/prisma";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import { Button } from "../ui/button";
import DatePicker from "../ui/datePicker";

const AddChildForm = ({
  parent,
  members,
  onAdd,
}: {
  parent: PersonWithRelations;
  members: PersonWithRelations[];
  onAdd: any;
}) => {
  const [firstName, setFirstName] = useState("");
  const [family, setFamily] = useState<Family | undefined>();
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
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
    isLoading,
    error,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    if (parent.gender === "MALE") {
      setFather(parent);
      setFamily(parent.family);
      const options = parent.femaleSpouses.map((s) => {
      return {
        id: s.femaleId,
        value: s.female.fullName,
      };
    });
    setSpouseOptions(options);
    } else if (parent.gender === "FEMALE") {
      setMother(parent);
      if (father) setFamily(parent.family);
      const options = parent.maleSpouses.map((s) => {
      return {
        id: s.maleId,
        value: s.male.fullName
      };
    });
    setSpouseOptions(options);
    }
    const familyOptions = families.map((family: Family) => ({
      id: family.id,
      value: family.name,
    }));
    setFamilyOptions(familyOptions);
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
        fullName: firstName + " " + family?.name,
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
      setGender("MALE");
      onAdd();
    } else {
      const error = await response.json()
      console.log(error)
      toast(`Adding ${firstName} Failed.`);
    }
  };

  if (isLoading) return <Loader2 />
  if (error || !families) return <ErrorAlert title="Something went wrong!" message="Families are not found." />

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Add Child
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
        {
          <SearchSelect
            options={familyOptions ?? []}
            selected={
              families.find((f: Family) => f.id === family?.id) &&
              family?.id
                ? {
                    id: family.id,
                    value: families.find(
                      (f: Family) => f.id === family.id
                    ).name,
                  }
                : null
            }
            onSelect={(option) => {
              setFamily(families.find((f:Family) => f.id = option.id));
            }}
            placeholder="Select Family"
          />
        }
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
            options={spouseOptions ?? []}
            selected={
              selectedSpouse
                ? {
                    id: selectedSpouse.id,
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
              parent.gender == "MALE" ? "Select Mother" : "Select Father"
            }
          />
        }

        <DatePicker placeholder="Birth Date" selectedDate={birthDate} onSubmit={(date) => setBirthDate(date)}/>
        <DatePicker placeholder="Death Date" selectedDate={deathDate} onSubmit={(date) => setDeathDate(date)}/>

        <Button
          type="submit"
          className="w-full py-2 px-4 font-semibold rounded-md transition"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddChildForm;
