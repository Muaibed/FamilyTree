"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { FamilyWithRootPerson } from "@/types/family";
import { Family } from "@/generated/prisma";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "../client/Modal";
import DeletePage from "../client/DeletePage";
import { deleteFamily } from "@/lib/queries/families";

export default function FamilyForm({
  onSubmit,
  onDelete,
  defaultValues,
  title,
}: {
  onSubmit: (data: Partial<Family>) => void;
  onDelete: () => void;
  defaultValues?: Partial<FamilyWithRootPerson>;
  title: string;
}) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFamilyMutation = useMutation({
    mutationFn: deleteFamily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["families"] });
    },
  });

  const handleDelete = async () => {
    if (!defaultValues?.id) return;

    deleteFamilyMutation.mutate(defaultValues.id);
    onDelete();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      </div>
      <ScrollArea className="max-h-[100vh] md:max-h-[600px] overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-1">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  type="text"
                  placeholder="اسم العائلة"
                  required
                  dir="rtl"
                />
              </div>
            )}
          />

          <div>
            <div className="flex flex-col gap-2 mt-3">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsDeleting(true)}
              >
                حذف
              </Button>
              <Button type="submit">تأكيد</Button>
            </div>
          </div>
        </form>

        <Modal
          isOpen={!!isDeleting}
          onClose={() => {
            setIsDeleting(false);
          }}
        >
          {isDeleting && defaultValues?.name && (
            <DeletePage
              name={defaultValues?.name}
              onSubmit={() => {
                handleDelete();
                setIsDeleting(false);
              }}
            />
          )}
        </Modal>
      </ScrollArea>
    </div>
  );
}
