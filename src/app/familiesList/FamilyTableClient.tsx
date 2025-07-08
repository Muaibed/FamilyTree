"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Modal } from "../../components/client/Modal";
import { Family } from "../../types/family";
import EditFamilyForm from "@/components/forms/EditFamilyForm";

export function FamilyTableClient({ data, onChange }: { data: Family, onChange: any }) {
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const tableColumns = columns({
    onEdit: (person: Family) => setSelectedFamily(person),
  });

  return (
    <>
      <DataTable columns={tableColumns} data={Object.values(data)} />
      {selectedFamily && (
        <Modal isOpen={true} onClose={() => setSelectedFamily(null)}>
          <EditFamilyForm family={selectedFamily} onEdit={onChange} />
        </Modal>
      )}
    </>
  );
}