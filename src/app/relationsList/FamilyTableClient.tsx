"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { SpouseRelationshipWithPartners } from "@/types/family";
import { SpouseRelationship } from "@/generated/prisma";
import { useState } from "react";
import { Modal } from "@/components/client/Modal";
import EditSpouseRelationship from "../pages/SpouseRelationship/EditSpouseRelationship";
import CreateSpouseRelationship from "../pages/SpouseRelationship/CreateSpouseRelationship";
import { Button } from "@/components/ui/button";

export function FamilyTableClient({
  data,
  onChange,
}: {
  data: SpouseRelationshipWithPartners[];
  onChange: any;
}) {
  const [selectedRelation, setSelectedRelation] = useState<
    SpouseRelationship | undefined
  >(undefined);
  const [isCreating, setIsCreating] = useState(false);

  const tableColumns = columns({
    onEdit: (relation: SpouseRelationship) => setSelectedRelation(relation),
  });

  return (
    <>
      <DataTable
        columns={tableColumns}
        data={Object.values(data)}
        action={<Button onClick={() => setIsCreating(true)}>إضافة</Button>}
      />
      {selectedRelation && (
        <Modal
          isOpen={!!selectedRelation}
          onClose={() => setSelectedRelation(undefined)}
        >
          <EditSpouseRelationship
            id={selectedRelation.id}
            onSubmit={() => {
              onChange();
              setSelectedRelation(undefined);
            }}
            onDelete={() => setSelectedRelation(undefined)}
          />
        </Modal>
      )}
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)}>
        <CreateSpouseRelationship
          onSuccess={() => {
            onChange();
            setIsCreating(false);
          }}
        />
      </Modal>
    </>
  );
}
