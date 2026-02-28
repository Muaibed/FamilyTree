import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { PersonWithRelations } from "@/types/family";
import { Person } from "@/generated/prisma";
import DatePicker from "../ui/datePicker";
import { Input } from "../ui/input";
import SelectGender from "../preDefinedData/SelectGender";
import SearchSelectMember from "../preDefinedData/SearchSelectMember";
import { Loader2 } from "lucide-react";
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
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-1">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <div>
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
                <SelectGender {...field} selected={field.value} />
              </div>
            )}
          />

          <Controller
            name="fatherId"
            control={control}
            render={({ field }) => (
              <div>
                <SearchSelectMember
                  {...field}
                  options={maleMembersOptions}
                  placeholder="اختر الأب (اختياري)"
                  selectedMemberId={field.value ?? undefined}
                />
              </div>
            )}
          />          

          <Controller
            name="motherId"
            control={control}
            render={({ field }) => (
              <div>
                <SearchSelectMember
                  {...field}
                  options={femaleMembersOptions}
                  placeholder="اختر الأم (اختياري)"
                  selectedMemberId={field.value ?? undefined}
                />
              </div>
            )}
          />

          <Controller
            name="familyId"
            control={control}
            render={({ field }) => (
              <div>
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
                <TrueFalseSelect
                  placeholder="متوفى"
                  selected={field.value}
                  onChange={() => setValue("isDead", field.value)}
                />
              </div>
            )}
          />

          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <div>
                <DatePicker
                  placeholder="تاريخ الميلاد (اختياري)"
                  selectedDate={field.value ?? undefined}
                  onSubmit={() => setValue("birthDate", field.value)}
                />
              </div>
            )}
          />

          <Controller
            name="deathDate"
            control={control}
            render={({ field }) => (
              <div>
                <DatePicker
                  placeholder="تاريخ الوفاة (اختياري)"
                  selectedDate={field.value ?? undefined}
                  onSubmit={() => setValue("deathDate", field.value)}
                />
              </div>
            )}
          />

          {spouses && spouses.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-right">الأزواج</h3>
              {spouses.map((spouse) => (
                <div className="mb-2" key={spouse.id}>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (defaultValues?.gender === "MALE") {
                          deleteRelation(defaultValues.id!, spouse.id);
                        } else {
                          deleteRelation(spouse.id, defaultValues?.id!);
                        }
                        setSpouses((prev) => prev.filter((s) => s.id !== spouse.id));
                      }}
                    >
                      حذف
                    </Button>
                    <p className="text-sm" dir="rtl">{spouse.fullName}</p>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
}
