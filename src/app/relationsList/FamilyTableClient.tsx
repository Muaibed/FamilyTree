"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SpouseRelationshipWithPartners } from "@/types/family";
import { SpouseRelationship } from "@/generated/prisma";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/client/Modal";
import { toast } from "sonner";
import EditSpouseRelationshipForm from "@/components/forms/EditSpouseRelationshipForm";

export function FamilyTableClient({ data, onChange }: { data: SpouseRelationshipWithPartners[], onChange: any }) {
  const [selectedRelation, setSelectedRelation] = useState<SpouseRelationship | undefined>(undefined);
  const tableColumns = columns({
    onEdit: (relation: SpouseRelationship) => setSelectedRelation(relation),
  });

  // const handleDeletion = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const response = await fetch(`api/spouseRelationship/${selectedRelation?.id}`, {
  //           method: "DELETE",
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //       })

  //       if (response.ok) {
  //           toast(`Relation ${selectedRelation?.id} has beed deleted successfully.`) 
  //           onChange()
  //       } else {
  //           const error = await response.json();
  //           toast(`Deleting relation ${selectedRelation?.id} falied!`)
  //           console.log(error)
  //       }
  // }
  return (
    <>
    <DataTable columns={tableColumns} data={Object.values(data)} />;
    {selectedRelation && (
    <Modal isOpen={!!selectedRelation} onClose={() => setSelectedRelation(undefined)}>
        <EditSpouseRelationshipForm relation={selectedRelation} onEdit={onChange}/>
    </Modal>
    )}
  </>
  )
}
