// FamilyTableClient.tsx (Client Component)
"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Modal } from "../../components/client/Modal";
import { PersonWithRelations } from "../../types/family";
import EditPerson from "../pages/EditPerson";

export function FamilyTableClient({
  data,
}: {
  data: PersonWithRelations[];
}) {
  const [selectedPerson, setSelectedPerson] = useState<PersonWithRelations | undefined>(undefined);
  const tableColumns = columns({
    onEdit: (person: PersonWithRelations) => setSelectedPerson(person),
  });

  return (
    <>
      <DataTable columns={tableColumns} data={Object.values(data)} />
      {selectedPerson && (
        <Modal isOpen={true} onClose={() => setSelectedPerson(undefined)}>
          <EditPerson id={selectedPerson.id} onSubmit={() => setSelectedPerson(undefined)} onDelete={() => setSelectedPerson(undefined)} />
        </Modal>
      )}
    </>
  );
}
