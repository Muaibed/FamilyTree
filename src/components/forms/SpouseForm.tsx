"use client";

import { useMemo, useState } from "react";
import { SpouseRelationshipWithPartners } from "@/types/family";
import { Button } from "../ui/button";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import { SpouseRelationship } from "@/generated/prisma";
import { ScrollArea } from "../ui/scroll-area";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/lib/queries/familyTreeMembers";
import { Option } from "@/types/ui";
import { Loader2, User } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import { ConfirmDialog } from "../ui/ConfirmDialog";

const SpouseForm = ({
  onSubmit,
  onDelete,
  defaultValues,
  title,
  gender,
}: {
  onSubmit: (data: Partial<SpouseRelationship>) => void;
  onDelete?: () => void;
  defaultValues?: Partial<SpouseRelationshipWithPartners>;
  title: string;
  gender?: "MALE" | "FEMALE";
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...defaultValues,
    },
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

  const maleMembersOptions = useMemo<Option[]>(
    () =>
      members
        .filter((m) => m.gender === "MALE")
        .map((item) => ({
          id: item.id,
          label: item.firstName,
          value: item.fullName,
        })),
    [members],
  );

  const femaleMembersOptions = useMemo<Option[]>(
    () =>
      members
        .filter((m) => m.gender === "FEMALE")
        .map((item) => ({
          id: item.id,
          label: item.firstName,
          value: item.fullName,
        })),
    [members],
  );

  const isEditMode = !!(defaultValues?.maleId && defaultValues?.femaleId);
  const showMale = !isEditMode && (!gender || gender === "MALE");
  const showFemale = !isEditMode && (!gender || gender === "FEMALE");

  if (membersLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 />
      </div>
    );
  if (membersError) return <ErrorAlert />;
  if (!members) return null;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      </div>
      <ScrollArea className="max-h-[100vh] md:max-h-[600px] overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-1">

          {/* Edit mode: show read-only partner names + isActive toggle */}
          {isEditMode && (
            <>
              <div className="space-y-2" dir="rtl">
                <label className="text-xs text-muted-foreground block">الزوج</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-md border bg-muted/30">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{(defaultValues as SpouseRelationshipWithPartners)?.male?.fullName ?? defaultValues?.maleId}</span>
                </div>
              </div>
              <div className="space-y-2" dir="rtl">
                <label className="text-xs text-muted-foreground block">الزوجة</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-md border bg-muted/30">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{(defaultValues as SpouseRelationshipWithPartners)?.female?.fullName ?? defaultValues?.femaleId}</span>
                </div>
              </div>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2 cursor-pointer text-sm" dir="rtl">
                    <input
                      type="checkbox"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="accent-primary w-4 h-4"
                    />
                    العلاقة مستمرة
                  </label>
                )}
              />
            </>
          )}

          {/* Create mode: partner selectors */}
          {showMale && (
            <Controller
              name="maleId"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl">الزوج <span className="text-red-500">*</span></label>
                  <SearchSelectMember
                    {...field}
                    options={maleMembersOptions}
                    placeholder="اختر زوج"
                    selectedMemberId={field.value ?? undefined}
                  />
                </div>
              )}
            />
          )}

          {showFemale && (
            <Controller
              name="femaleId"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl">الزوجة <span className="text-red-500">*</span></label>
                  <SearchSelectMember
                    {...field}
                    options={femaleMembersOptions}
                    placeholder="اختر زوجة"
                    selectedMemberId={field.value ?? undefined}
                  />
                </div>
              )}
            />
          )}

          {!isEditMode && (
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-2 cursor-pointer text-sm" dir="rtl">
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  العلاقة مستمرة
                </label>
              )}
            />
          )}

          <div>
            <div className="flex flex-col gap-2 mt-3">
              {onDelete && (
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
          </div>
        </form>
      </ScrollArea>

      <ConfirmDialog
        open={isDeleting}
        title="تأكيد حذف العلاقة الزوجية"
        message="هل أنت متأكد من حذف هذه العلاقة الزوجية؟"
        onConfirm={() => {
          setIsDeleting(false);
          onDelete?.();
        }}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
};

export default SpouseForm;
