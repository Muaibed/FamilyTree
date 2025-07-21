"use client";

import { SpouseRelationship } from "@/generated/prisma";
import { toast } from "sonner";
import { Button } from "../ui/button";

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
        هل أنت متأكد من حذف هذه العلاقة؟
      </h2>
      <Button
        className="p-1 pl-4 pr-4"
        variant="destructive"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        تأكيد
      </Button>
    </div>
  );
};

export default DeleteSpouseRelationship;
