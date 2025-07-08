"use client";

import { FamilyTreeData, Person } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SearchSelect from "../client/SearchSelect";
import { Option } from "@/types/ui";

const AddChildForm = ({
  members,
  onAdd,
}: {
  members: FamilyTreeData;
  onAdd: any;
}) => {
  const [name, setName] = useState("");
  const [membersOptions, setMembersOptions] = useState<Option[]>();
  const [selectedRootPerson, setSelectedRootPerson] = useState<
    Person | undefined
  >();

  useEffect(() => {
    const options = Object.entries(members.people).map(([id]) => ({
      id: id,
      value: members.people[id].name,
    }));
    setMembersOptions(options);
  }, [members]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rootPersonId = selectedRootPerson?.id;
    const response = await fetch("api/family", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rootPersonId,
      }),
    });

    if (response.ok) {
      toast(`${name} has been added successfully.`);
      setName("");
      setSelectedRootPerson(undefined);
      onAdd();
    } else {
      const errorData = await response.json();
      toast(`Adding ${name} Failed.`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Create Family
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {
          <SearchSelect
            className="w-full justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            options={membersOptions ?? []}
            selected={
              selectedRootPerson
                ? {
                    id: selectedRootPerson.id.toString(),
                    value: selectedRootPerson.name,
                  }
                : null
            }
            onSelect={(option) => {
              const spouse = membersOptions?.find(
                (f) => f.id.toString() === option.id
              );
              if (spouse) {
                setSelectedRootPerson(members.people[spouse.id]);
              }
            }}
            placeholder={"Select root person"}
          />
        }

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
