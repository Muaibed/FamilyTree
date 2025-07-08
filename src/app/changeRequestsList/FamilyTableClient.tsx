"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ChangeRequest } from "@/generated/prisma";
import { useState } from "react";
import { Modal } from "@/components/client/Modal";
import AddChangeRequest from "@/components/client/ChangeRequestApproval";

export function FamilyTableClient({
  data,
  onChange,
}: {
  data: ChangeRequest[];
  onChange: any;
}) {
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null);
    const tableColumns = columns({
      showDetails: (request: ChangeRequest) => setSelectedRequest(request),
    });
  return (
    <>
      <DataTable columns={tableColumns} data={Object.values(data)} />
      {selectedRequest && (
        <Modal isOpen={true} onClose={() => setSelectedRequest(null)}>
          <AddChangeRequest request={selectedRequest} onChange={onChange} />
        </Modal>
      )}
    </>
  );
}