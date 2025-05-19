// src/app/components/EditPersonForm.tsx

"use client";

import { FamilyTreeData, Person } from "@/types/family";
import { toast } from "sonner"
import { useState } from "react";

const EditPersonForm = ({
  person,
  members,
}: {
  person: Person;
  members: FamilyTreeData;
}) => {
  const [firstName, setFirstName] = useState(person.name);
  const [familyName, setFamilyName] = useState(person.familyName);
  const [gender, setGender] = useState<"MALE" | "FEMALE">(person.gender);
  const [fatherId, setFatherId] = useState<string | undefined>(person.fatherId);
  const [motherId, setMotherId] = useState<string | undefined>(person.motherId);
  const [birthDate, setBirthDate] = useState(person.birthDate);
  const [deathDate, setDeathDate] = useState(person.deathDate);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`api/person/${person.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        familyName,
        gender,
        fatherId,
        motherId,
      }),
    });

    if (response.ok) {
      setSuccess(true);
      setError(null);
      toast(`${firstName} has been updated successfully.`)
    } else {
      const errorData = await response.json();
      setError(errorData.error || "An error occurred");
      toast(`Updating ${firstName} Failed.`)
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <select
          value={fatherId}
          onChange={(e) => setFatherId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Father</option>
          {Object.entries(members.people)
            .filter(([key, person]) => person.gender === "MALE")
            .map(([key, person]) => {
              return (
                <option value={person.id} key={person.id}>
                  {person.name} {person.familyName} {person.id}
                </option>
              );
            })}
        </select>
        <select
          value={motherId ?? ""}
          onChange={(e) => setMotherId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Mother (optional)</option>
          {Object.entries(members.people)
            .filter(([key, person]) => person.gender === "FEMALE")
            .map(([key, person]) => {
              return (
                <option value={person.id} key={person.id}>
                  {person.name} {person.familyName} {person.id}
                </option>
              );
            })}
        </select>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Birth Date"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={deathDate}
          onChange={(e) => setFamilyName(e.target.value)}
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

export default EditPersonForm;
