"use client";

import { SpouseRelationship } from "@/generated/prisma";
import { toast } from "sonner";

const DeleteSpouseRelationship = ({
  relation,
  onSubmit,
}: {
  relation: SpouseRelationship;
  onSubmit: () => void;
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response = await fetch(`api/spouseRelationship/${relation.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        onSubmit();
        toast(`Relation has been deleted successfully.`);
      } else {
        toast(`Deleting Relation Failed.`);
      }
    } catch (error) {
      toast(`Deleting Relation Failed.`, {
        description: `${error}`,
      });
    } finally {
      onSubmit();
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">
        Are you sure to delete this relationship?
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

export default DeleteSpouseRelationship;
