"use client";

import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Option } from "@/types/ui";
import { useMembersContext } from "../client/MembersContextProvider";
import { Modal } from "../client/Modal";
import DeleteFamily from "../client/DeleteFamily";
import SearchSelect from "../client/SearchSelect";
import { Person } from "@/generated/prisma";
import ErrorAlert from "../alerts/ErrorAlert";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const EditFamilyForm = ({
  family,
  onEdit,
}: {
  family: FamilyWithRootPerson;
  onEdit?: any;
}) => {
  const [name, setName] = useState(family.name);
  const [rootPerson, setRootPerson] = useState<Person | undefined>(
    family.rootPerson ? family.rootPerson : undefined
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [rootPersonOptions, setRootPersonOptions] = useState<Option[]>();

  const { members, isLoading, error, mutate } = useMembersContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`api/family/${family.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rootPersonId: rootPerson?.id,
        }),
      });

      if (response.ok) {
        toast(`${name} has been updated successfully.`);
        onEdit();
      } else {
        const error = await response.json();
        toast(`Updating ${name} Failed.` + error);
      }
    } catch (error) {
      console.error(error);
    }
  };

   useEffect(() => {
      const rootPersonOptions = Object.entries(members)
        .map(([_, member]) => ({
          id: member.id,
          value: member.fullName,
        }));
      setRootPersonOptions(rootPersonOptions);
   }, [members])

  if (!family || error) return <ErrorAlert title="Something went wrong!" />
  if (isLoading) return <Loader2 />
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Edit Family
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
            options={rootPersonOptions ?? []}
            selected={
              rootPerson
                ? {
                    id: rootPerson.id,
                    value: rootPerson.fullName,
                  }
                : null
            }
            onSelect={(option) => {
              const rootPerson = members.find((m) => m.id === option.id)
              if (rootPerson) {
                setRootPerson(rootPerson);
              }
            }}
            placeholder="Select a root"
          />
        }
        <div>
          <Button
            type="button"
            className="w-full py-2 px-4 font-semibold rounded-md transition bg-secondary"
            onClick={() => setIsDeleting(!isDeleting)}
          >
            DELETE
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 font-semibold rounded-md transition"
          onSubmit={() => {onEdit(); setIsDeleting(false)}}
        >
          Submit
        </Button>
      </form>
      <div>
      </div>

      {isDeleting && (
      <Modal
        isOpen={!!isDeleting}
        onClose={() => {
          setIsDeleting(false);
        }}
      >
          <DeleteFamily
            family={family}
            onSubmit={() => {
              onEdit();
              setIsDeleting(false);
            }}
          />
      </Modal>
      )}
    </div>
  );
};

export default EditFamilyForm;
