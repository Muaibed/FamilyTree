import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { PersonWithRelations } from "@/types/family";
import { Person } from "@/generated/prisma";
import DatePicker from "../ui/datePicker";
import { Input } from "../ui/input";
import SelectGender from "../preDefinedData/SelectGender";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import { Loader2, Trash2, User } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";
import TrueFalseSelect from "../preDefinedData/BooleanSelect";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpouseRelationship } from "@/lib/queries/spouseRelationships";
import { getFamilies } from "@/lib/queries/families";
import { Modal } from "../client/Modal";
import DeletePage from "../client/DeletePage";
import { deletePerson, getPerson } from "@/lib/queries/persons";
import { getMembers } from "@/lib/queries/familyTreeMembers";
import { Option } from "@/types/ui";
import SearchSelectFamily from "../preDefinedData/SearchSelectFamily";
import { usePopoverZoom } from "@/contexts/popoverZoom";

export default function PersonForm({
  onSubmit,
  onDelete,
  defaultValues,
  title,
}: {
  onSubmit: (data: Partial<Person>) => void;
  onDelete: () => void;
  defaultValues?: Partial<PersonWithRelations>;
  title: string;
}) {
  const zoom = usePopoverZoom();
  const labelStyle = zoom ? { fontSize: `${1 / zoom}em`, height: `${0.7 / zoom}em` } : undefined;

  const spousesStyle = zoom ? { fontSize: `${1 / zoom}em` } : undefined;

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    values: defaultValues,
  });

  const [spouses, setSpouses] = useState<Person[]>(() => {
    if (!defaultValues) return [];
    const spouseList = defaultValues.gender === "MALE"
      ? defaultValues.maleSpouses?.map((s) => s.female) || []
      : defaultValues.femaleSpouses?.map((s) => s.male) || [];
    return spouseList;
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

  const {
    data: families = [],
    isLoading: familiesLoading,
    isError: familiesError,
  } = useQuery({
    queryKey: ["families"],
    queryFn: getFamilies,
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

  // When a parent is pre-set, restrict the other parent's options to that parent's active spouses
  const presetFatherId = defaultValues?.father?.id;
  const presetMotherId = defaultValues?.mother?.id;

  const fatherOptions = useMemo<Option[]>(() => {
    if (presetMotherId) {
      const mother = members.find((m) => m.id === presetMotherId);
      if (mother) {
        return mother.femaleSpouses
          .map((s) => ({ id: s.male.id, label: s.male.firstName, value: s.male.fullName }));
      }
    }
    return maleMembersOptions;
  }, [presetMotherId, members, maleMembersOptions]);

  const motherOptions = useMemo<Option[]>(() => {
    if (presetFatherId) {
      const fatherMember = members.find((m) => m.id === presetFatherId);
      if (fatherMember) {
        return fatherMember.maleSpouses
          .map((s) => ({ id: s.female.id, label: s.female.firstName, value: s.female.fullName }));
      }
    }
    return femaleMembersOptions;
  }, [presetFatherId, members, femaleMembersOptions]);

  const familiesOptions = useMemo<Option[]>(
    () =>
      families.map((item) => ({
        id: item.id,
        value: item.name,
      })),
    [members],
  );

  const selectdFather = watch("fatherId");

  const {
    data: father,
    isLoading: fatherLoading,
    error: fatherError,
  } = useQuery({
    queryKey: ["father", selectdFather],
    queryFn: () => getPerson(selectdFather!),
    enabled: !!selectdFather,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (father) {
      setValue("familyId", father.familyId);
    }
  }, [father, setValue]);

  useEffect(() => {
    if (maleMembersOptions && defaultValues?.father) {
      setValue("fatherId", defaultValues.father.id);
    }

    if (femaleMembersOptions && defaultValues?.mother)
      setValue("motherId", defaultValues.mother.id);
  }, [defaultValues, maleMembersOptions, femaleMembersOptions, setValue]);

  const selectedDeathDate = watch("deathDate")

  const deletePersonMutation = useMutation({
    mutationFn: deletePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["family-tree"] });
    },
  });

  const deleteRelationMutation = useMutation({
    mutationFn: deleteSpouseRelationship,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relations"] });
    },
  });

  const handleDelete = async () => {
    if (!defaultValues?.id) return;

    deletePersonMutation.mutate(defaultValues.id);
    onDelete();
  };

  const deleteRelation = async (maleId: string, femaleId: string) => {
    deleteRelationMutation.mutate({ maleId, femaleId });
  };

  if (familiesLoading || fatherLoading || membersLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 />
      </div>
    );

  if (familiesError || fatherError || membersError) return <ErrorAlert />;

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4" style={labelStyle}>{title}</h2>
      </div>
      <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-1">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>الاسم الأول <span className="text-red-500">*</span></label>
                <Input
                  {...field}
                  type="text"
                  placeholder="الاسم الأول"
                  required
                  dir="rtl"
                />
              </div>
            )}
          />

          <Controller
            name="kunya"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>الكنية</label>
                <Input
                  {...field}
                  type="text"
                  placeholder="الكنية"
                  value={field.value ?? ""}
                  dir="rtl"
                />
              </div>
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>الجنس <span className="text-red-500">*</span></label>
                <SelectGender {...field} selected={field.value} />
              </div>
            )}
          />

          <Controller
            name="fatherId"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>الأب</label>
                <SearchSelectMember
                  {...field}
                  options={fatherOptions}
                  placeholder="اختر الأب (اختياري)"
                  selectedMemberId={field.value ?? undefined}
                  emptyFallBack={`لم تتم إضافة زوج لـ ${defaultValues?.mother?.firstName}`}
                />
              </div>
            )}
          />

          <Controller
            name="motherId"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>الأم</label>
                <SearchSelectMember
                  {...field}
                  options={motherOptions}
                  placeholder="اختر الأم (اختياري)"
                  selectedMemberId={field.value ?? undefined}
                  emptyFallBack={`لم تتم إضافة زوجة لـ ${defaultValues?.father?.firstName}`}
                />
              </div>
            )}
          />

          <Controller
            name="familyId"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>العائلة <span className="text-red-500">*</span></label>
                <SearchSelectFamily
                  {...field}
                  options={familiesOptions}
                  selectedFamilyId={field.value}
                />
              </div>
            )}
          />

          <Controller
            name="isDead"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>متوفى</label>
                <TrueFalseSelect
                  placeholder="متوفى"
                  selected={field.value}
                  onChange={(bool) => {
                    setValue("isDead", bool === "true" ? true : false)
                  }}
                  disabled={!!selectedDeathDate}
                />
              </div>
            )}
          />

          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>تاريخ الميلاد</label>
                <DatePicker
                  placeholder="تاريخ الميلاد (اختياري)"
                  selectedDate={field.value ?? undefined}
                  onSubmit={(date) => setValue("birthDate", date)}
                />
              </div>
            )}
          />

          <Controller
            name="deathDate"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block text-right" dir="rtl" style={labelStyle}>تاريخ الوفاة</label>
                <DatePicker
                  placeholder="تاريخ الوفاة (اختياري)"
                  selectedDate={field.value ?? undefined}
                  onSubmit={(date) => {
                    setValue("deathDate", date);
                    setValue("isDead", !!date);
                  }}
                />
              </div>
            )}
          />

          {spouses && spouses.length > 0 && (
            <div>
              <label className="text-xs text-muted-foreground mb-2 block text-right" dir="rtl" style={labelStyle}>الأزواج</label>
              <div className="space-y-2">
                {spouses.map((spouse) => (
                  <div key={spouse.id} className="flex items-center justify-between gap-2 px-3 py-2 rounded-md border bg-muted/30">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="w-7 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                      onClick={() => {
                        if (defaultValues?.gender === "MALE") {
                          deleteRelation(defaultValues.id!, spouse.id);
                        } else {
                          deleteRelation(spouse.id, defaultValues?.id!);
                        }
                        setSpouses((prev) => prev.filter((s) => s.id !== spouse.id));
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <div className="flex items-center gap-2" dir="rtl">
                      <User className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span style={spousesStyle}>{spouse.fullName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className="flex flex-col gap-2 mt-3">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsDeleting(true)}
                style={labelStyle}
              >
                حذف
              </Button>
              <Button type="submit" style={labelStyle}>تأكيد</Button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        isOpen={!!isDeleting}
        onClose={() => {
          setIsDeleting(false);
        }}
      >
        {isDeleting && defaultValues?.firstName && (
          <DeletePage
            name={defaultValues?.firstName}
            onSubmit={() => {
              handleDelete();
              setIsDeleting(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
