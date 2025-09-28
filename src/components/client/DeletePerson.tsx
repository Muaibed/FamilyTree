"use client";

import { PersonWithRelations } from "@/types/family";
import { toast } from "sonner";
import { Button } from "../ui/button";

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/person/${person.id}`, {
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
      <h2 className="text-xl font-bold mb-4 mt-2">
        هل أنت متأكد من حذف {person.firstName}؟
      </h2>
      <Button
        className="p-1 pl-4 pr-4 w-1/6"
        variant="destructive"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        حذف
      </Button>
    </div>
  );
};

export default DeletePerson;
