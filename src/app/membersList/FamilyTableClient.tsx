"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Modal } from "../../components/client/Modal";
import { PersonWithRelations } from "../../types/family";
import EditPerson from "../pages/Person/EditPerson";
import CreatePerson from "../pages/Person/CreatePerson";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export function FamilyTableClient({ data }: { data: PersonWithRelations[] }) {
  const queryClient = useQueryClient();
  const [selectedPerson, setSelectedPerson] = useState<
    PersonWithRelations | undefined
  >(undefined);
  const [isCreating, setIsCreating] = useState(false);

  const tableColumns = columns({
    onEdit: (person: PersonWithRelations) => setSelectedPerson(person),
  });

  return (
    <>
      <DataTable
        columns={tableColumns}
        data={Object.values(data)}
        action={<Button onClick={() => setIsCreating(true)}>إضافة</Button>}
      />
      {selectedPerson && (
        <Modal isOpen={true} onClose={() => setSelectedPerson(undefined)}>
          <EditPerson
            id={selectedPerson.id}
            onSubmit={() => setSelectedPerson(undefined)}
            onDelete={() => setSelectedPerson(undefined)}
          />
        </Modal>
      )}
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)}>
        <CreatePerson
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
            setIsCreating(false);
          }}
        />
      </Modal>
    </>
  );
}
