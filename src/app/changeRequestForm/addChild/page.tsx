"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Option } from "@/types/ui";
import useSWR from "swr";
import SearchSelect from "@/components/client/SearchSelect";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family";

const AddChild = () => {
  const session = useSession()

  const { members, isLoading:membersLoading, error:membersError, mutate: mutateMembers } = useMembersContext();

  const searchParams = useSearchParams();
  const parentId = searchParams.get("parentId");
  const parent = parentId ? members.find((m) => m.id === parentId) : undefined;
    
  const [requesterId, setRequesterId] = useState<string | undefined>(session.data?.user.id);
  const [requesterName, setRequesterName] = useState(session.data?.user.name);
  const [requesterPhone, setRequesterPhone] = useState(session.data?.user.phone);
  const [firstName, setFirstName] = useState("");
  const [family, setFamily] = useState<FamilyWithRootPerson | undefined>()
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [father, setFather] = useState<PersonWithRelations | undefined>();
  const [mother, setMother] = useState<PersonWithRelations | undefined>();
  const [birthDate, setBirthDate] = useState<string | undefined>();
  const [deathDate, setDeathDate] = useState<string | undefined>();
  const [familyOptions, setFamilyOptions] = useState<Option[]>();
  const [spouseOptions, setSpouseOptions] = useState<Option[]>();
  const [selectedSpouse, setSelectedSpouse] = useState<PersonWithRelations | undefined>();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: families,
    isLoading: familiesLoading,
    error: familiesError,
    mutate: mutateFamilies,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, fetcher);

  useEffect(() => {
    if (parent && members) {
        if (parent.gender === "MALE") {
          setFather(parent);
          setFamily(parent.family);
          const options = parent.femaleSpouses.map((s) => {
            return {
              id: s.femaleId,
              value: s.female.fullName,
            };
          });
          setSpouseOptions(options);
        } else if (parent.gender === "FEMALE") {
          setMother(parent);
          if (father) setFamily(parent.family);
            const options = parent.maleSpouses.map((s) => {
            return {
              id: s.maleId,
              value: s.male.fullName
            };
          });
          setSpouseOptions(options);
        }
    }
        if (families) {
            const familyOptions = families.map((family: FamilyWithRootPerson) => ({
              id: family.id,
              value: family.name,
            }));
            setFamilyOptions(familyOptions);
        }
  }, [members, father, parent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/changeRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "ADD",
        targetModel: "PERSON",
        dataJSON: {
          firstName,
          familyId: family?.id,
          gender,
          birthDate,
          deathDate,
          fatherId: father?.id,
          motherId: mother?.id,
        },
        requesterId,
        requesterName,
        requesterPhone,
      }),
    });

    if (response.ok) {
      toast(`A change request for ${firstName} has been added successfully.`);
      window.location.href = "/";
    } else {
      toast(`Adding a change request for ${firstName} Failed.`);
    }
  };

  if (membersLoading || familiesLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }
  if (!families || familiesError)
    return (
      <ErrorAlert
        title="Something wrong happened!"
        message="Families are missing."
      ></ErrorAlert>
    );
  if (!members || membersError)
    return (
      <ErrorAlert
        title="Something wrong happened!"
        message="Family members are missing."
      ></ErrorAlert>
    );
    if (!parent) {
        return (
            <ErrorAlert title="No Parent is Selected!">
            </ErrorAlert>
        )
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Add Child to {parent.firstName}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {
          <SearchSelect
            options={familyOptions ?? []}
            selected={
              families.find((f: FamilyWithRootPerson) => f.id === family?.id) &&
              family?.id
                ? {
                    id: family.id,
                    value: family.name
                  }
                : null
            }
            onSelect={(option) => {
            const family = families.find((f: FamilyWithRootPerson) => f.id === option.id)
                  if (family)
                    setFamily(family);
                }}
                placeholder="Select Family"
          />
        }
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        {
          <SearchSelect
            className="w-full justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            options={spouseOptions ?? []}
            selected={
              selectedSpouse
                ? {
                    id: selectedSpouse.id.toString(),
                    value: selectedSpouse.fullName,
                  }
                : null
            }
            onSelect={(option) => {
              const spouseOption = spouseOptions?.find(
                (f) => f.id.toString() === option.id
              );
              const spouse = members.find((m:PersonWithRelations) => m.id === option.id)
              if (spouse) {
                setSelectedSpouse(spouse);
                parent.gender == "MALE"
                  ? setMother(spouse)
                  : setFather(spouse);
              }
            }}
            placeholder={
              parent?.gender == "MALE" ? "Select Mother" : "Select Father"
            }
          />
        }

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="Birth Date"
          className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <input
          type="date"
          value={deathDate}
          onChange={(e) => setDeathDate(e.target.value)}
          placeholder="Death Date"
          className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {!session.data && 
          <div className="flex flex-col gap-2">
            <hr className="w-60 h-0.5 mx-auto my-4 bg-gray-200 dark:bg-gray-700" />
            <input 
              type="text" 
              value={requesterName ?? ""}
              onChange={(e) => setRequesterName(e.target.value)}
              placeholder="Requester Name (optional)"
              className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <input 
              type="text" 
              value={requesterPhone ?? ""}
              onChange={(e) => setRequesterPhone(e.target.value)}
              placeholder="Requester Phone (optional)"
              className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        }
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold rounded-md transition"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddChild;
