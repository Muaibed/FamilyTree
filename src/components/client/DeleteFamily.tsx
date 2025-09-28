"use client";

import { Family } from "@/generated/prisma";
import { toast } from "sonner";
import { Button } from "../ui/button";

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${family.id}`, {
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
        هل أنت متأكد من حذف {family.name}؟
      </h2>
      <Button
        className="p-1 pl-4 pr-4 w-1/6"
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

export default DeleteFamily;
