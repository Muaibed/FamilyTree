// src/app/components/EditPersonForm.tsx

"use client";

import { Person } from "@/types/family";
import { toast } from "sonner";

const DeletePerson = ({
  person,
  onSubmit,
  onResult,
}: {
  person: Person;
  onSubmit: () => void;
  onResult?: (status: "success" | "error") => void;
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response = await fetch(`api/person/${person.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        onResult?.("success");
        onSubmit;
        toast(`${person.name} has been deleted successfully.`);
      } else {
        onResult?.("error");
        toast(`Deleting ${person.name} Failed.`);
      }
    } catch (error) {
      onResult?.("error");
      toast(`Deleting ${person.name} Failed.`, {
        description: `${error}`,
      });
    } finally {
      onSubmit;
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">
        Are you sure to delete {person.name}?
      </h2>
      <button
        className="bg-rose-700 dark:bg-rose-700 rounded hover:cursor-pointer p-1 pl-4 pr-4"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        CONFIRM
      </button>
    </div>
  );
};

export default DeletePerson;
