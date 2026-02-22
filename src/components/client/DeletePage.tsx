"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";

const DeletePage = ({
  name,
  onSubmit,
}: {
  name: string;
  onSubmit: () => void;
}) => {

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      onSubmit();
    } catch (error) {
      toast(`Deleting ${name} Failed.`, {
        description: `${error}`,
      });
    } finally {
      onSubmit();
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4 mt-2">
        هل أنت متأكد من حذف {name}؟
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

export default DeletePage;
