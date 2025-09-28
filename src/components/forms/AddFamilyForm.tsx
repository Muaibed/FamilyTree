"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Person } from "@/generated/prisma";
import { Button } from "../ui/button";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";

const AddFamilyForm = ({
  onAdd,
}: {
  onAdd: any;
}) => {
  const [name, setName] = useState("");
  const [selectedRootPerson, setSelectedRootPerson] = useState<
    Person | undefined
  >();
  
  const { data: session, status } = useSession();
  const ownerId = session?.user.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rootPersonId = selectedRootPerson?.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rootPersonId,
        ownerId,
      }),
    });

    if (response.ok) {
      toast(`${name} has been added successfully.`);
      setName("");
      setSelectedRootPerson(undefined);
      onAdd();
    } else {
      toast(`Adding ${name} Failed.`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg">
      <div className="flex items-center justify-center w-full">
      <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
        إضافة عائلة
      </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="الاسم" onChange={(e) => setName(e.target.value)} required dir="rtl"/>

        <SearchSelectMember placeholder="اختر جذر العائلة" onChange={setSelectedRootPerson}/>
  
        <Button
          type="submit"
          className="w-full py-2 px-4"
        >
          تأكيد
        </Button>
      </form>
    </div>
  );
};

export default AddFamilyForm;
