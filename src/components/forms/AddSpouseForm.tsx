"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Option } from "@/types/ui";
import SearchSelect from "../client/SearchSelect";
import { PersonWithRelations } from "@/types/family";
import { Button } from "../ui/button";

const AddSpouseForm = ({
  person,
  members,
  onAdd,
}: {
  person: PersonWithRelations;
  members: PersonWithRelations[];
  onAdd: any;
}) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [spouseOptions, setSpouseOptions] = useState<Option[]>();
  const [selectedSpouse, setSelectedSpouse] = useState<PersonWithRelations | undefined>();

  useEffect(() => {
     if (person.gender === "MALE") {
      const options = members
        .filter(member => member.gender === "FEMALE")
        .map((s) => {
        return {
          id: s.id,
          value: s.fullName,
        };
      });
    
      setSpouseOptions(options);

    } else if (person.gender === "FEMALE") {
      const options = members
        .filter(member => member.gender === "MALE")
        .map((s) => {
      return {
        id: s.id,
        value: s.fullName
      };
    });
    setSpouseOptions(options);
    }
  }, [members]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("api/spouseRelationship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        maleId: person.gender === "MALE" ? person.id : selectedSpouse?.id, 
        femaleId: person.gender === "FEMALE" ? person.id : selectedSpouse?.id, 
        isActive, 
      }),
    });

    if (response.ok) {
      toast(`${selectedSpouse?.firstName} has been added successfully.`);
      setSelectedSpouse(undefined);
      onAdd(selectedSpouse);
    } else {
      const errorData = await response.json();
      toast(`Adding ${selectedSpouse?.firstName} Failed.`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
        Add Spouse
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <SearchSelect
          options={spouseOptions ?? []}
          selected={
            selectedSpouse
              ? {
                  id: selectedSpouse.id,
                  value: selectedSpouse.firstName,
                }
              : null
          }
          onSelect={(option) => {
            const spouse = members.find(
              (f) => f.id === option.id
            );
            if (spouse) {
              setSelectedSpouse(spouse);
            }
          }}
          placeholder="Select Spouse"
        />
        
        <select
          onChange={(e) =>
            e.target.value == "true" ? setIsActive(true) : setIsActive(false)
          }
          required
          className={`w-full justify-between px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring flex items-center`}
        >
          <option value="" disabled>
            Current?
          </option>
          <option value={"ture"}>True</option>
          <option value={"false"}>False</option>
        </select>
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

export default AddSpouseForm;
