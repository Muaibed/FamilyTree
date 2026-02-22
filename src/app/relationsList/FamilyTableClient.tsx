"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SpouseRelationshipWithPartners } from "@/types/family";
import { SpouseRelationship } from "@/generated/prisma";
import { useState } from "react";
import { Modal } from "@/components/client/Modal";
import EditSpouseRelationship from "../pages/EditSpouseRelationship";

export function FamilyTableClient({ data, onChange }: { data: SpouseRelationshipWithPartners[], onChange: any }) {
  const [selectedRelation, setSelectedRelation] = useState<SpouseRelationship | undefined>(undefined);
  const tableColumns = columns({
    onEdit: (relation: SpouseRelationship) => setSelectedRelation(relation),
  });

  return (
    <>
    <DataTable columns={tableColumns} data={Object.values(data)} />;
    {selectedRelation && (
    <Modal isOpen={!!selectedRelation} onClose={() => setSelectedRelation(undefined)}>
        <EditSpouseRelationship id={selectedRelation.id} onSubmit={() => {
          onChange();
          setSelectedRelation(undefined);
        }} onDelete={() => setSelectedRelation(undefined)} />
    </Modal>
    )}
  </>
  )
}
