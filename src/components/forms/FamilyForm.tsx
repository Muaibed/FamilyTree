"use client";

import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { FamilyWithRootPerson } from "@/types/family";
import { Family } from "@/generated/prisma";
import { Input } from "../ui/input";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import { ScrollArea } from "../ui/scroll-area";
import TrueFalseSelect from "../preDefinedData/BooleanSelect";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "../client/Modal";
import DeletePage from "../client/DeletePage";
import { deleteFamily } from "@/lib/queries/families";
import { getMembers } from "@/lib/queries/familyTreeMembers";
import { Option } from "@/types/ui";

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
    setValue,
  } = useForm({
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

          <Controller
            name="rootPersonId"
            control={control}
            render={({ field }) => (
              <div>
                <SearchSelectMember
                  {...field}
                  options={membersOptions}
                  placeholder="اختر الجد الأكبر (اختياري)"
                  selectedMemberId={field.value ?? undefined}
                />
              </div>
            )}
          />

          <Controller
            name="isDisplayed"
            control={control}
            render={({ field }) => (
              <div>
                <TrueFalseSelect
                  placeholder="عرض في القائمة"
                  selected={field.value}
                  onChange={(value) => setValue("isDisplayed", value === "true")}
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
