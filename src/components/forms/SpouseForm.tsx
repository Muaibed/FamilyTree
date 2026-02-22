"use client";

import { useMemo, useState } from "react";
import { SpouseRelationshipWithPartners } from "@/types/family";
import { Button } from "../ui/button";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import { SpouseRelationship } from "@/generated/prisma";
import { ScrollArea } from "../ui/scroll-area";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMembers } from "@/lib/queries/familyTreeMembers";
import { Option } from "@/types/ui";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";

const SpouseForm = ({
  onSubmit,
  defaultValues,
  title,
  gender,
}: {
  onSubmit: (data: Partial<SpouseRelationship>) => void;
  defaultValues?: Partial<SpouseRelationshipWithPartners>;
  title: string;
  gender: "MALE" | "FEMALE";
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
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

  if (membersLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 />
      </div>
    );
  if (membersError) return <ErrorAlert />;
  if (!members) return null;

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

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      </div>
      <ScrollArea className="max-h-[100vh] md:max-h-[600px] overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-1">
          {gender === "MALE" && (
            <Controller
              name="maleId"
              control={control}
              render={({ field }) => (
                <div>
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

          {gender === "FEMALE" && (
            <Controller
              name="femaleId"
              control={control}
              render={({ field }) => (
                <div>
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
      </ScrollArea>
    </div>
  );
};

export default SpouseForm;
