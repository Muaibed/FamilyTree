"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Modal } from "../../components/client/Modal";
import EditFamilyForm from "@/components/forms/EditFamilyForm";
import { FamilyWithRootPerson } from "@/types/family";

export function FamilyTableClient({ data, onChange }: { data: FamilyWithRootPerson[], onChange: any }) {
  const [selectedFamily, setSelectedFamily] = useState<FamilyWithRootPerson | undefined>(undefined);
  const tableColumns = columns({
    onEdit: (family: FamilyWithRootPerson) => setSelectedFamily(family),
  });

  return (
    <>
      <DataTable columns={tableColumns} data={Object.values(data)} />
      {selectedFamily && (
        <Modal isOpen={true} onClose={() => setSelectedFamily(undefined)}>
          <EditFamilyForm family={selectedFamily} onEdit={onChange} />
        </Modal>
      )}
    </>
  );
}