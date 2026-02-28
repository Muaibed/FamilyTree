"use client";

import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { FamilyTreeWithDetails } from "@/types/family";
import { FamilyTree } from "@/generated/prisma";
import { Input } from "../ui/input";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import { ScrollArea } from "../ui/scroll-area";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "../client/Modal";
import DeletePage from "../client/DeletePage";
import { deleteFamilyTree } from "@/lib/queries/familyTrees";
import { getMembers } from "@/lib/queries/familyTreeMembers";
import { Option } from "@/types/ui";

export default function FamilyTreeForm({
  onSubmit,
  onDelete,
  defaultValues,
  title,
}: {
  onSubmit: (data: Partial<FamilyTree>) => void;
  onDelete: () => void;
  defaultValues?: Partial<FamilyTreeWithDetails>;
  title: string;
}) {
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: members = [],
    isLoading: membersLoading,
    isError: membersError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  const membersOptions = useMemo<Option[]>(
    () =>
      members.map((item) => ({
        id: item.id,
        label: item.firstName,
        value: item.fullName,
      })),
    [members],
  );

  const deleteMutation = useMutation({
    mutationFn: deleteFamilyTree,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-family-trees"] });
    },
  });

  const handleDelete = () => {
    if (!defaultValues?.id) return;
    deleteMutation.mutate(defaultValues.id);
    onDelete();
  };

  if (membersLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 />
      </div>
    );

  if (membersError) return <ErrorAlert />;

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
              <Input
                {...field}
                type="text"
                placeholder="اسم الشجرة"
                required
                dir="rtl"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ?? ""}
                type="text"
                placeholder="وصف الشجرة (اختياري)"
                dir="rtl"
              />
            )}
          />
          <Controller
            name="rootPersonId"
            control={control}
            render={({ field }) => (
              <SearchSelectMember
                {...field}
                options={membersOptions}
                placeholder="اختر الجد الأكبر"
                selectedMemberId={field.value ?? undefined}
              />
            )}
          />
          <div className="flex flex-col gap-2 mt-3">
            {defaultValues?.id && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsDeleting(true)}
              >
                حذف
              </Button>
            )}
            <Button type="submit">تأكيد</Button>
          </div>
        </form>

        <Modal isOpen={!!isDeleting} onClose={() => setIsDeleting(false)}>
          {isDeleting && defaultValues?.name && (
            <DeletePage
              name={defaultValues.name}
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
