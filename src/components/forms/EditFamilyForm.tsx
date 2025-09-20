"use client";

import { FamilyWithRootPerson } from "@/types/family";
import { toast } from "sonner";
import { useState } from "react";
import { Modal } from "../client/Modal";
import DeleteFamily from "../client/DeleteFamily";
import { Person } from "@/generated/prisma";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import SelectBoolean from "../preDefinedData/BooleanSelect";
import { ScrollArea } from "../ui/scroll-area";

const EditFamilyForm = ({
  family,
  onEdit,
}: {
  family: FamilyWithRootPerson;
  onEdit?: any;
}) => {
  const [name, setName] = useState(family.name);
  const [rootPerson, setRootPerson] = useState<Person | undefined>(
    family.rootPerson ? family.rootPerson : undefined
  );
  const [isDisplayed, setIsDisplayed] = useState(family.isDisplayed);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${family.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rootPersonId: rootPerson?.id,
          isDisplayed
        }),
      });

      if (response.ok) {
        toast(`${name} has been updated successfully.`);
        onEdit();
      } else {
        toast(`Updating ${name} Failed.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4">تعديل معلومات العائلة</h2>
      </div>
      <ScrollArea className="max-h-[100vh] md:max-h-[600px] overflow-auto">
      <form onSubmit={handleSubmit} className="space-y-4 m-1">
        <Input
          type="text"
          placeholder="الاسم"
          value={family.name}
          onChange={(e) => setName(e.target.value)}
          required
          dir="rtl"
        />

        <SearchSelectMember
          placeholder="اختر جذر العائلة"
          selected={rootPerson}
          onChange={setRootPerson}
        />

        <SelectBoolean
          placeholder="هل العائلة مرئية في شجرة العائلة؟"
          selected={isDisplayed}
          onChange={(strBool:string) => {
            strBool === "true" ? setIsDisplayed(true) : setIsDisplayed(false);
            }}
        />

        <div>
          <div className="flex flex-col gap-2 mt-3">
            <Button
              type="button"
              variant="destructive"
              onClick={() => setIsDeleting(!isDeleting)}
            >
              حذف
            </Button>

            <Button
              type="submit"
              onSubmit={() => {
                onEdit();
                setIsDeleting(false);
              }}
            >
              تأكيد
            </Button>
          </div>
        </div>
      </form>
      <div></div>

      {isDeleting && (
        <Modal
          isOpen={!!isDeleting}
          onClose={() => {
            setIsDeleting(false);
          }}
        >
          <DeleteFamily
            family={family}
            onSubmit={() => {
              onEdit();
              setIsDeleting(false);
            }}
          />
        </Modal>
      )}
    </ScrollArea>
    </div>
  );
};

export default EditFamilyForm;
