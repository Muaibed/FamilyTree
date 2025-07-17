"use client";

import { PersonWithRelations } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SearchSelect from "../client/SearchSelect";
import { Option } from "@/types/ui";
import { Person } from "@/generated/prisma";
import { Button } from "../ui/button";

const AddChildForm = ({
  members,
  onAdd,
}: {
  members: PersonWithRelations[];
  onAdd: any;
}) => {
  const [name, setName] = useState("");
  const [membersOptions, setMembersOptions] = useState<Option[]>();
  const [selectedRootPerson, setSelectedRootPerson] = useState<
    Person | undefined
  >();

  useEffect(() => {
    const options = members.map((member) => ({
      id: member.id,
      value: member.fullName,
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
        Create Family
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />

        {
          <SearchSelect
            options={membersOptions ?? []}
            selected={
              selectedRootPerson
                ? {
                    id: selectedRootPerson.id.toString(),
                    value: selectedRootPerson.firstName,
                  }
                : null
            }
            onSelect={(option) => {
              const spouse = members?.find(
                (f) => f.id.toString() === option.id
              );
              if (spouse) {
                setSelectedRootPerson(spouse);
              }
            }}
            placeholder={"Select root person"}
          />
        }

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

export default AddChildForm;
