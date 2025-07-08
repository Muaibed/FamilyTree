"use client";

import { Family } from "@/types/family";
import { toast } from "sonner";
import { useState } from "react";
import { useMembersContext } from "../client/MembersContextProvider";
import { Modal } from "../client/Modal";
import DeleteFamily from "../client/DeleteFamily";

const EditFamilyForm = ({
  family,
  onEdit,
}: {
  family: Family;
  onEdit?: any;
}) => {
  const [name, setName] = useState(family.name);
  const [rootPersonId, setRootPersonId] = useState<string | undefined>(
    family.rootPersonId?.toString()
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
          rootPersonId,
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
        <select
          value={rootPersonId ?? ""}
          onChange={(e) => setRootPersonId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Root Person</option>
          {Object.entries(members.people).map(([key, person]) => {
            return (
              <option value={person.id} key={person.id}>
                {person.name} {person.family.name} {person.id}
              </option>
            );
          })}
        </select>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-md transition"
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
