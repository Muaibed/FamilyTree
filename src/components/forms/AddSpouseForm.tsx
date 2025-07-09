"use client";

import { FamilyTreeData, Person } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Option } from "@/types/ui";
import SearchSelect from "../client/SearchSelect";

const AddSpouseForm = ({
  personId,
  members,
  onAdd,
}: {
  personId: string;
  members: FamilyTreeData;
  onAdd: any;
}) => {
  const [spouseId, setSpouseId] = useState<string | undefined>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [spouseOptions, setSpouseOptions] = useState<Option[]>();
  const [selectedSpouse, setSelectedSpouse] = useState<Person | undefined>();

  const person = personId ? members.people[personId] : null;
  const gender = person?.gender;

  useEffect(() => {
    if (gender == "MALE") {
      const options = Object.entries(members.people)
        .filter(([key, member]) => member.gender === "FEMALE")
        .map(([memberId, isActive]) => ({
          id: memberId,
          value: members.people[memberId].name,
        }));
      setSpouseOptions(options);
    }

    if (gender == "FEMALE") {
      const options = Object.entries(members.people)
        .filter(([key, member]) => member.gender === "MALE")
        .map(([memberId, isActive]) => ({
          id: memberId,
          value: members.people[memberId].name,
        }));
      setSpouseOptions(options);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/spouseRelationship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personId, spouseId, isActive }),
    });

    if (response.ok) {
      toast(`${spouseId} has been added successfully.`);
      setSpouseId(undefined);
      onAdd(spouseId);
    } else {
      const errorData = await response.json();
      toast(`Adding ${spouseId} Failed.`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Add Spouse
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <SearchSelect
          className="w-full justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          options={spouseOptions ?? []}
          selected={
            selectedSpouse
              ? {
                  id: selectedSpouse.id.toString(),
                  value: selectedSpouse.name,
                }
              : null
          }
          onSelect={(option) => {
            const spouse = spouseOptions?.find(
              (f) => f.id.toString() === option.id
            );
            if (spouse) {
              setSelectedSpouse(members.people[spouse.id]);
              setSpouseId(spouse.id);
            }
          }}
          placeholder="Select Spouse"
        />
        
        <select
          onChange={(e) =>
            e.target.value == "true" ? setIsActive(true) : setIsActive(false)
          }
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Current?
          </option>
          <option value={"ture"}>True</option>
          <option value={"false"}>False</option>
        </select>
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

export default AddSpouseForm;
