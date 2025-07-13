"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import SearchSelect from "@/components/client/SearchSelect";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Option } from "@/types/ui";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PersonWithRelations } from "@/types/family";

const AddSpouseRelationship = () => {
  const session = useSession();

  const { members, isLoading, error, mutate } = useMembersContext();

  const searchParams = useSearchParams();
  const personId = searchParams.get("personId");
  const person = personId ? members.find((m) => m.id === personId) : undefined;

  const [requesterId, setRequesterId] = useState<string | undefined>(
    session.data?.user.id
  );
  const [requesterName, setRequesterName] = useState(session.data?.user.name);
  const [requesterPhone, setRequesterPhone] = useState(
    session.data?.user.phone
  );
  const [isActive, setIsActive] = useState<boolean>(true);
  const [spouseOptions, setSpouseOptions] = useState<Option[]>();
  const [selectedSpouse, setSelectedSpouse] = useState<PersonWithRelations | undefined>();

  useEffect(() => {
    if (person && members) {
        if (person.gender === "MALE") {
          const options = members.filter((member) => member.gender === "FEMALE").map((member) => {
            return {
              id: member.id,
              value: member.fullName,
            };
          });
          setSpouseOptions(options);
        } else if (person.gender === "FEMALE") {
          const options = members.filter((member) => member.gender === "MALE").map((member) => {
            return {
              id: member.id,
              value: member.fullName
            };
          });
          setSpouseOptions(options);
        }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/changeRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "ADD",
        targetModel: "SPOUSERELATIONSHIP",
        dataJSON: {
          person1Id: personId,
          person2Id: selectedSpouse?.id,
          isActive,
        },
        requesterId,
        requesterName,
        requesterPhone,
      }),
    });

    if (response.ok) {
      toast(`A change request for ${selectedSpouse?.fullName} has been added successfully.`);
      window.location.href = "/";
    } else {
      toast(`Adding a change request for ${selectedSpouse?.fullName} Failed.`);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }
  if (!members || error)
    return (
      <ErrorAlert
        title="Something wrong happened!"
        message="Family members are missing."
      ></ErrorAlert>
    );

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Create Change Request
      </h2>    <form onSubmit={handleSubmit} className="space-y-4">
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
                }
              }}
              placeholder="Select a Spouse"
            />
        }
        {!session.data && (
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
        )}
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

export default AddSpouseRelationship;
