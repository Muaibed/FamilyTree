// FamilyTableClient.tsx (Client Component)
"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Modal } from "../../components/client/Modal";
import { FamilyTreeData, Person } from "../../types/family";
import EditPersonForm from "../../components/client/EditPersonForm";

export function FamilyTableClient({ data, onChange }: { data: FamilyTreeData, onChange: any }) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const tableColumns = columns({
    onEdit: (person: Person) => setSelectedPerson(person),
  });

  return (
    <>
      <DataTable columns={tableColumns} data={Object.values(data.people)} />
      {selectedPerson && (
        <Modal isOpen={true} onClose={() => setSelectedPerson(null)}>
          <EditPersonForm person={selectedPerson} members={data} onEdit={onChange} />
        </Modal>
      )}
    </>
  );
}