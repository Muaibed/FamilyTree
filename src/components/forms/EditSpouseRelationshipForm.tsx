"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Modal } from "../client/Modal";
import { SpouseRelationship } from "@/generated/prisma";
import ErrorAlert from "../alerts/ErrorAlert";
import { Button } from "../ui/button";
import DeleteSpouseRelationship from "../client/DeleteSpouseRelationship";

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
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Edit Spouse Relationship
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
         <select
          value={isActive ? "True" : "False"}
          onChange={(e) => setIsActive(e.target.value === 'True' ? true : false)}
          required
          className={`w-full justify-between px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring flex items-center`}
        >
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
        <div>
          <Button
            type="button"
            className="w-full py-2 px-4 font-semibold rounded-md transition bg-secondary"
            onClick={() => setIsDeleting(!isDeleting)}
          >
            DELETE
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 font-semibold rounded-md transition"
          onSubmit={() => {onEdit(); setIsDeleting(false)}}
        >
          Submit
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
