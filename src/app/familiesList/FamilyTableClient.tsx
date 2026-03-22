"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Modal } from "../../components/client/Modal";
import EditFamily from "../pages/Family/EditFamily";
import CreateFamily from "../pages/Family/CreateFamily";
import { FamilyWithRootPerson } from "@/types/family";
import { Button } from "@/components/ui/button";

export function FamilyTableClient({
  data,
  onChange,
}: {
  data: FamilyWithRootPerson[];
  onChange: any;
}) {
  const [selectedFamily, setSelectedFamily] = useState<
    FamilyWithRootPerson | undefined
  >(undefined);
  const [isCreating, setIsCreating] = useState(false);

  const tableColumns = columns({
    onEdit: (family: FamilyWithRootPerson) => setSelectedFamily(family),
  });

  return (
    <>
      <DataTable
        columns={tableColumns}
        data={Object.values(data)}
        action={<Button onClick={() => setIsCreating(true)}>إضافة</Button>}
      />
      {selectedFamily && (
        <Modal isOpen={true} onClose={() => setSelectedFamily(undefined)}>
          <EditFamily
            id={selectedFamily.id}
            onSubmit={() => {
              onChange();
              setSelectedFamily(undefined);
            }}
            onDelete={() => {
              onChange();
              setSelectedFamily(undefined);
            }}
          />
        </Modal>
      )}
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)}>
        <CreateFamily
          onSuccess={() => {
            onChange();
            setIsCreating(false);
          }}
        />
      </Modal>
    </>
  );
}
