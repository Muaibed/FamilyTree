"use client";

import { Family } from "@/types/family";
import { toast } from "sonner";

const DeleteFamily = ({
  family,
  onSubmit,
}: {
  family: Family;
  onSubmit: () => void;
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response = await fetch(`api/family/${family.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        onSubmit();
        toast(`${family.name} has been deleted successfully.`);
      } else {
        toast(`Deleting ${family.name} Failed.`);
      }
    } catch (error) {
      toast(`Deleting ${family.name} Failed.`, {
        description: `${error}`,
      });
    } finally {
      onSubmit();
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">
        Are you sure to delete {family.name}?
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

export default DeleteFamily;
