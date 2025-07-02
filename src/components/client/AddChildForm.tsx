// src/app/components/AddChildForm.tsx

"use client";

import { FamilyTreeData, Person } from "@/types/family";
import { toast } from "sonner"
import { useEffect, useState } from "react";
import SearchSelect from "./SearchSelect";
import { Option } from "@/types/ui";

const AddChildForm = ({
  parent,
  members,
  onAdd,
}: {
  parent: Person;
  members: FamilyTreeData;
  onAdd: any;
}) => {
  
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [fatherId, setFatherId] = useState<string | undefined>();
  const [motherId, setMotherId] = useState<string | undefined>();
  const [birthDate, setbirthDate] = useState<string | undefined>();
  const [deathDate, setDeathDate] = useState<string | undefined>();
  const [spouseOptions, setSpouseOptions] = useState<Option[]>();
  const [selectedSpouse, setSelectedSpouse] = useState<Person | undefined>();

  useEffect(() => { 
    if (parent.gender === "MALE") {
      setFatherId(parent.id)
      setFamilyName(parent.familyName)
    }
    else if (parent.gender === "FEMALE") {
      setMotherId(parent.id)
      if (fatherId)
        setFamilyName(members.people[fatherId].familyName)
    }

      const options = members.people[parent.id].spouses.map(([spouseId, isActive]) => ({
      id: spouseId,
      value: members.people[spouseId].name,
    }));
    setSpouseOptions(options)
  }, [fatherId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        familyName,
        gender,
        birthDate,
        fatherId,
        motherId,
      }),
    });

    if (response.ok) {
      toast(`${firstName} has been added successfully.`)
      setFirstName("");
      setFamilyName("");
      setGender("MALE");
      onAdd();
    } else {
      const errorData = await response.json();
      toast(`Adding ${firstName} Failed.`)
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
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Family Name"
          required
          className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        {(
          <SearchSelect
            className="w-full justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            options={spouseOptions ?? []}
            selected={selectedSpouse ? { id: selectedSpouse.id.toString(), value: selectedSpouse.name } : null}
            onSelect={(option) => {
              const spouse = spouseOptions?.find((f) => f.id.toString() === option.id);
              if (spouse) {
                setSelectedSpouse(members.people[spouse.id]);
                parent.gender == "MALE" ? setMotherId(spouse.id) : setFatherId(spouse.id)
              }
            }}
            placeholder={parent.gender == "MALE" ? "Select Mother" : "Select Father"}
          />
        )}

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

export default AddChildForm;
