"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Modal } from "../client/Modal";
import { SpouseRelationship } from "@/generated/prisma";
import ErrorAlert from "../alerts/ErrorAlert";
import { Button } from "../ui/button";
import DeleteSpouseRelationship from "../client/DeleteSpouseRelationship";
import TrueFalseSelect from "../preDefinedData/TrueFalseSelect";

const EditSpouseRelationshipForm = ({
  relation,
  onEdit,
}: {
  relation: SpouseRelationship;
  onEdit: any;
}) => {
  const [isActive, setIsActive] = useState<boolean>(relation.isActive);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`api/spouseRelationship/${relation.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive,
        }),
      });

      if (response.ok) {
        toast(`relation has been updated successfully.`);
        onEdit();
      } else {
        toast(`Updating relation Failed.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!relation) return <ErrorAlert title="Something went wrong!" />
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg">
      <div className="flex items-center justify-center w-full">
      <h2 className="text-2xl font-semibold mb-4">
        تعديل علاقة
      </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
         <TrueFalseSelect 
            placeholder="العلاقة مستمرة؟" 
            selected={isActive} 
            onChange={(strBool:string) => {
              strBool === "true" ? setIsActive(true) : setIsActive(false);
              }} 
          />
        <div>
          <Button
            type="button"
            className="w-full py-2 px-4 font-semibold"
            variant="destructive"
            onClick={() => setIsDeleting(!isDeleting)}
          >
            حذف
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 font-semibold rounded-md transition"
          onSubmit={() => {onEdit(); setIsDeleting(false)}}
        >
          تأكيد
        </Button>
      </form>
      <div>
      </div>

      {isDeleting && (
      <Modal
        isOpen={!!isDeleting}
        onClose={() => {
          setIsDeleting(false);
        }}
      >
          <DeleteSpouseRelationship
            relation={relation}
            onSubmit={() => {
              onEdit();
              setIsDeleting(false);
            }}
          />
      </Modal>
      )}
    </div>
  );
};

export default EditSpouseRelationshipForm;
