// src/app/components/CreatePersonForm.tsx

"use client";

import { FamilyTreeData, Person } from "@/types/family";
import { getAllFemales, getAllMales } from "@/lib/person";
import { toast } from "sonner"
import { useState } from "react";

const AddSpouseForm = ({
  personId,
  members,
}: {
  personId: string;
  members: FamilyTreeData;
}) => {
  const [spouseId, setSpouseId] = useState<string | undefined>();

  const person = personId ? members.people[personId] : null;
  const gender = person?.gender;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/spouseRelationship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personId, spouseId }),
    });

    if (response.ok) {
      toast(`${spouseId} has been added successfully.`)
      setSpouseId(undefined);
    } else {
      const errorData = await response.json();
      toast(`Adding ${spouseId} Failed.`)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Add Spouse
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {gender && (
          <select
            value={spouseId ?? ""}
            onChange={(e) => setSpouseId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Spouse</option>
            {gender === "MALE" &&
              Object.entries(members.people)
                .filter(([key, member]) => member.gender === "FEMALE")
                .map(([key, member]) => {
                  return (
                    <option key={member.id} value={member.id}>
                      {member.id} {member.name} {member.familyName}
                    </option>
                  );
                })}
            {gender === "FEMALE" &&
              Object.entries(members.people)
                .filter(([key, member]) => member.gender === "MALE")
                .map(([key, member]) => {
                  return (
                    <option key={member.id} value={member.id}>
                      {member.id} {member.name} {member.familyName}
                    </option>
                  );
                })}
          </select>
        )}

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
