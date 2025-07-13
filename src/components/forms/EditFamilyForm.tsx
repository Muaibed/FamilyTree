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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Edit Family
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

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-md transition"
          onSubmit={() => onEdit()}
        >
          Submit
        </button>
      </form>
      <div>
        <div>
          <button
            className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white p-1 w-fit pl-2 pr-2 rounded m-2"
            onClick={() => setIsDeleting(!isDeleting)}
          >
            DELETE
          </button>
        </div>
      </div>

      <Modal
        isOpen={!!isDeleting}
        onClose={() => {
          setIsDeleting(false);
          setDeleteModalOpen(false);
        }}
      >
        {isDeleting && (
          <DeleteFamily
            family={family}
            onSubmit={() => {
              onEdit();
              setIsDeleting(false);
              setDeleteModalOpen(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default EditFamilyForm;
