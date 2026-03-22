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
import { useGroups } from "@/hooks/useGroup";

type FamilyFormValues = Omit<Partial<FamilyWithRootPerson>, "groupId"> & { groupId?: string | null };

export default function FamilyForm({
  onSubmit,
  onDelete,
  defaultValues,
  title,
}: {
  onSubmit: (data: Partial<Family> & { groupId?: string | null }) => void;
  onDelete: () => void;
  defaultValues?: FamilyFormValues;
  title: string;
}) {
  const queryClient = useQueryClient();
  const { data: groups = [] } = useGroups('ADD_FAMILY');

  const {
    control,
    handleSubmit,
  formState: { isDirty },
  } = useForm<FamilyFormValues>({
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
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl">اسم العائلة <span className="text-red-500">*</span></label>
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

          {groups.length > 0 && (
            <Controller
              name="groupId"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl">المجموعة (اختياري)</label>
                  <select
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value || null)}
                    dir="rtl"
                    className="w-full border rounded-md p-2 bg-background text-foreground text-sm"
                  >
                    <option value="">بدون مجموعة (شخصي)</option>
                    {groups.map((g: { id: string; name: string }) => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
              )}
            />
          )}

          <div>
            <div className="flex flex-col gap-2 mt-3">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsDeleting(true)}
              >
                حذف
              </Button>
              <Button type="submit" disabled={!isDirty}>تأكيد</Button>
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
