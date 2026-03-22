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
import { useGroups } from "@/hooks/useGroup";

type FamilyTreeFormValues = Omit<Partial<FamilyTreeWithDetails>, "groupId"> & { groupId?: string | null };

export default function FamilyTreeForm({
  onSubmit,
  onDelete,
  defaultValues,
  title,
}: {
  onSubmit: (data: Partial<FamilyTree> & { groupId?: string | null }) => void;
  onDelete: () => void;
  defaultValues?: FamilyTreeFormValues;
  title: string;
}) {
  const queryClient = useQueryClient();
  const { data: groups = [] } = useGroups('ADD_FAMILY_TREE');

  const { control, handleSubmit, formState: { isDirty } } = useForm<FamilyTreeFormValues>({
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
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl">اسم الشجرة <span className="text-red-500">*</span></label>
                <Input
                  {...field}
                  type="text"
                  placeholder="اسم الشجرة"
                  required
                  dir="rtl"
                />
              </div>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl">وصف الشجرة</label>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type="text"
                  placeholder="وصف الشجرة (اختياري)"
                  dir="rtl"
                />
              </div>
            )}
          />
          <Controller
            name="rootPersonId"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl">الجد الأكبر <span className="text-red-500">*</span></label>
                <SearchSelectMember
                  {...field}
                  options={membersOptions}
                  placeholder="اختر الجد الأكبر"
                  selectedMemberId={field.value ?? undefined}
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
            <Button type="submit" disabled={!isDirty}>تأكيد</Button>
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
