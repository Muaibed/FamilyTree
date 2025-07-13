import { ChangeRequest } from "@/generated/prisma"
import { Button } from "../ui/button"
import JSONtoHTML from "./JSONtoHTML";
import { toast } from "sonner";

const ChangeRequestApproval = ({request, onChange}: {request: ChangeRequest, onChange: any}) => {
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
            toast(`Request ${request.id} has beed approved successfully.`) 
            onChange()
        } else {
            const error = await response.json();
            toast(`Approving request ${request.id} falied!`)
            console.log(error)
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

    return (
        <div>
            <div>ID: {request.id}</div>
            <div>Action: {request.action}</div>
            <div>Target Model: {request.targetModel}</div>
            {request.targetId && (
                <div>
                    <div>Target ID: {request.targetId}</div>
                </div>
            )}
            <div>Status: {request.status}</div>
            <JSONtoHTML data={request.data}/>
            {request.requesterId &&
                <div>Requester ID: {request.requesterId}</div>
            }
            {request.requesterName &&
                <div>RequesterName: {request.requesterName}</div>
            }
            {request.requesterPhone &&
                <div>Requester Phone: {request.requesterPhone}</div>
            }
            <div className="flex flex-row gap-2">
                <Button 
                    className="bg-green-600 hover:bg-green-500 hover:cursor-pointer" 
                    onClick={(e) => {
                        handleApprove(e)
                    }}
                >
                    Approve
                </Button>
                <Button 
                    className="bg-red-500 hover:bg-red-400 hover:cursor-pointer"
                    onClick={(e) => {
                        handleReject(e)
                    }}
                >
                    Reject
                </Button>
            </div>
        </div>
    )
}

export default ChangeRequestApproval;