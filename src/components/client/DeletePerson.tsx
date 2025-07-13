"use client";

import { PersonWithRelations } from "@/types/family";
import { toast } from "sonner";

const DeletePerson = ({
  person,
  onSubmit,
}: {
  person: PersonWithRelations;
  onSubmit: () => void;
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
        onSubmit();
        toast(`${person.firstName} has been deleted successfully.`);
      } else {
        const error = await response.json();
        console.log(error)
        toast(`Deleting ${person.firstName} Failed.`);
      }
    } catch (error) {
      toast(`Deleting ${person.firstName} Failed.`, {
        description: `${error}`,
      });
    } finally {
      onSubmit();
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">
        Are you sure to delete {person.firstName}?
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
