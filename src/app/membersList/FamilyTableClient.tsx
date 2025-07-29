// FamilyTableClient.tsx (Client Component)
"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Modal } from "../../components/client/Modal";
import { PersonWithRelations } from "../../types/family";
import EditPersonForm from "../../components/forms/EditPersonForm";

export function FamilyTableClient({
  data,
  onChange,
}: {
  data: PersonWithRelations[];
  onChange: any;
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
          <EditPersonForm person={selectedPerson} onEdit={onChange()} />
        </Modal>
      )}
    </>
  );
}
