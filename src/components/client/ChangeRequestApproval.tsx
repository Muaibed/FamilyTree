import { ChangeRequest, SpouseRelationship } from "@/generated/prisma"
import { Button } from "../ui/button"
import { toast } from "sonner";
import Image from 'next/image';
import { useMembersContext } from "./MembersContextProvider";
import useSWR from "swr";
import { FamilyWithRootPerson, SpouseRelationshipWithPartners } from "@/types/family";
import JSONtoHTML from "./JSONtoHTML";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../alerts/ErrorAlert";

const ChangeRequestApproval = ({request, onChange}: {request: ChangeRequest, onChange: any}) => {
    const {
        members,
        isLoading,
        error,
        mutate: mutateMembers,
      } = useMembersContext();
      
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data: relations, isLoading: relationsLoading, error: relationsError, mutate: mutateRelations } = useSWR<SpouseRelationshipWithPartners[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/spouseRelationship`,
        fetcher
    );
    const { data: families, isLoading: familiesLoading, error: familiesError, mutate: mutateFamilies } = useSWR<FamilyWithRootPerson[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/family`,
        fetcher
    );
      
    const handleApprove = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("api/requestApproval", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                approval: "APPROVED",
                id: request.id,
                action: request.action,
                targetModel: request.targetModel,
                targetId: request.targetId,
                data: request.data
            })
        })

        if (response.ok) {
            toast(`Request has beed approved successfully.`) 
            onChange()
        } else {
            toast(`Approving request falied!`)
        }
    }

    const handleReject = async (e: React.FormEvent) => {
        e.preventDefault();    

        const response = await fetch("api/requestApproval", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                approval: "REJECTED",
                id: request.id,
            })
        })

        if (response.ok) {
            toast(`Request ${request.id} status changed to REJECTED`)
            onChange()
        }
        else {
            toast(`Request ${request.id} status did not change`)
        }
        
    }

    if (isLoading || familiesLoading || relationsLoading) return <div className="flex items-center justify-center w-full h-screen">
        <Loader2 />
    </div>

    if (error || familiesError || relationsError) {
        return <div>
            <ErrorAlert title="حدث خطأ!" message="خطأ في الحصول على البيانات"/>
        </div>
    }

    return (
        <div className="m-4 min-w-[400px]">
            <div className="bg-accent dark:bg-secondary rounded m-1">
                <div className="relative py-2 min-h-[2.5rem]">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p>{request.action}</p>
                    </div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Image src="/icons/gears.png" alt="Star" width={512} height={512} className="w-6 block dark:hidden" />
                        <Image src="/icons/white-gears.png" alt="Star" width={512} height={512} className="w-6 hidden dark:block" />
                    </div>
                </div>
            </div>
            <div className="bg-accent dark:bg-secondary rounded m-1">
                <div className="relative py-2 min-h-[2.5rem]">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p>{request.targetModel}</p>
                    </div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    {request.targetModel === "PERSON" && (<>
                        <Image src="/icons/user.png" alt="Star" width={512} height={512} className="w-6 block dark:hidden" />
                        <Image src="/icons/white-user.png" alt="Star" width={512} height={512} className="w-6 hidden dark:block" />
                    </>)}
                    {request.targetModel === "SPOUSERELATIONSHIP" && (<>
                        <Image src="/icons/wedding-rings.png" alt="Star" width={512} height={512} className="w-6 block dark:hidden" />
                        <Image src="/icons/white-wedding-rings.png" alt="Star" width={512} height={512} className="w-6 hidden dark:block" />
                    </>)}
                    </div>
                </div>
            </div>
            {request.targetId && request.targetModel === "PERSON" && (
                <div className="bg-accent dark:bg-secondary rounded m-1 h-auto p-2">
                  <div className="flex flex-row items-center justify-between py-2 relative min-h-[2.5rem]">
                        <div className="relative left-1/2 transform -translate-x-1/2 w-2/3">
                            <p>{members.find((m) => m.id === request.targetId)?.fullName}</p>
                        </div>
                        <div className="relative right-4 top-1/2 transform -translate-y-1/2">
                            <Image src="/icons/user.png" alt="Star" width={512} height={512} className="w-6 block dark:hidden" />
                            <Image src="/icons/white-user.png" alt="Star" width={512} height={512} className="w-6 hidden dark:block" />
                        </div>
                    </div>
                </div>
            )}
            {request.targetId && request.targetModel === "SPOUSERELATIONSHIP" && (
                <div className="bg-accent dark:bg-secondary rounded m-1">
                    <div className="relative py-2 min-h-[2.5rem]">
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                            <p>{relations?.find((m) => m.id === request.targetId)?.male.fullName + ", " + relations?.find((m) => m.id === request.targetId)?.female.fullName}</p>
                        </div>
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <Image src="/icons/wedding-rings.png" alt="Star" width={512} height={512} className="w-6 block dark:hidden" />
                            <Image src="/icons/white-wedding-rings.png" alt="Star" width={512} height={512} className="w-6 hidden dark:block" />
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-accent dark:bg-secondary rounded m-1">
                <div className="relative py-2 min-h-[2.5rem]">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p>{request.status}</p>
                    </div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Image src="/icons/status.png" alt="Status" width={512} height={512} className="w-6 block dark:hidden" />
                        <Image src="/icons/white-status.png" alt="Status" width={512} height={512} className="w-6 hidden dark:block" />
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {(() => {
                        if (request.status === "PENDING")
                            return <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        else if (request.status === "APPROVED")
                            return <div className="w-3 h-3 bg-green-500 rounded-full" />
                        else if (request.status === "REJECTED")
                            return <div className="w-3 h-3 bg-red-500 rounded-full" />
                    })()}
                    </div>
                </div>
            </div>
            <div className="bg-accent dark:bg-secondary rounded m-1">
                <div className="relative py-2 min-h-[2.5rem]">
                    <div className="flex items-center justify-center w-5/6">
                        <JSONtoHTML members={members} families={families} data={request.data}/>
                    </div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Image src="/icons/database.png" alt="Data" width={512} height={512} className="w-7 block dark:hidden" />
                        <Image src="/icons/white-database.png" alt="Data" width={512} height={512} className="w-7 hidden dark:block" />
                    </div>
                </div>
            </div>
            {request.requesterName &&
                <div className="bg-accent dark:bg-secondary rounded m-1">
                <div className="relative py-2 min-h-[2.5rem]">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p>{request.requesterName}</p>
                    </div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Image src="/icons/requester.png" alt="RequesterName" width={512} height={512} className="w-6 block dark:hidden" />
                        <Image src="/icons/white-requester.png" alt="RequesterName" width={512} height={512} className="w-6 hidden dark:block" />
                    </div>
                </div>
            </div>
            }
            {request.requesterPhone &&
                <div className="bg-accent dark:bg-secondary rounded m-1">
                <div className="relative py-2 min-h-[2.5rem]">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p>{request.requesterPhone}</p>
                    </div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Image src="/icons/phone.png" alt="RequesterPhone" width={512} height={512} className="w-6 block dark:hidden" />
                        <Image src="/icons/white-phone.png" alt="RequesterPhone" width={512} height={512} className="w-6 hidden dark:block" />
                    </div>
                </div>
            </div>
            }
            {request.status === "PENDING" && (
                <div className="flex items-center justify-center w-full">
                    <div className="flex flex-row gap-2 mt-4">
                        <Button 
                            className="bg-rose-700 hover:bg-rose-600  w-[7rem]"
                            onClick={(e) => {
                                handleReject(e)
                            }}
                        >
                            رفض
                        </Button>
                        <Button 
                            className="bg-green-700 hover:bg-green-500 w-[7rem]" 
                            onClick={(e) => {
                                handleApprove(e)
                            }}
                        >
                            قبول
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChangeRequestApproval;