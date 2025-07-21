"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import { useMembersContext } from "@/components/client/MembersContextProvider";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PersonWithRelations } from "@/types/family";
import SearchSelectMember from "@/components/preDefinedData/SearchSelectMember";
import { Input } from "@/components/ui/input";

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
  const [selectedSpouse, setSelectedSpouse] = useState<
    PersonWithRelations | undefined
  >();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/changeRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "ADD",
          targetModel: "SPOUSERELATIONSHIP",
          dataJSON: {
            maleId: person?.gender === "MALE" ? personId : selectedSpouse?.id,
            femaleId:
              person?.gender === "FEMALE" ? personId : selectedSpouse?.id,
            isActive,
          },
          requesterId,
          requesterName,
          requesterPhone,
        }),
      }
    );

    if (response.ok) {
      toast(
        `A change request for ${selectedSpouse?.fullName} has been added successfully.`
      );
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
        title="!حدث خطأ"
      ></ErrorAlert>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full">
          <h2 className="text-2xl font-semibold mb-4">
            طلب تعديل معلومات {person?.firstName}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
           <SearchSelectMember
                placeholder="اختر زوج"
                onChange={setSelectedSpouse}
                gender={person?.gender === "MALE" ? "FEMALE" : "MALE"}
            />
          {!session.data && (
            <div className="flex flex-col gap-2">
              <hr className="w-60 h-0.5 mx-auto my-4 bg-gray-200 dark:bg-gray-700" />
              <Input type="text" placeholder="اسم مقدم الطلب (اختياري)" onChange={(e) => setRequesterName(e.target.value)} dir="rtl"/>
              <Input type="text" placeholder="رقم مقدم الطلب (اختياري)" onChange={(e) => setRequesterPhone(e.target.value)} dir="rtl"/>
            </div>
          )}
          <Button
            type="submit"
            className="w-full py-2 px-4 font-semibold"
          >
            تأكيد
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddSpouseRelationship;
