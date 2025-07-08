import { ChangeRequest } from "@/generated/prisma"
import { Button } from "../ui/button"
import JSONtoHTML from "./JSONtoHTML";

const AddChangeRequest = ({request, onChange}: {request: ChangeRequest, onChange: any}) => {
    return (
        <div>
            <div>Action: {request.action}</div>
            <div>Target Model: {request.targetModel}</div>
            {request.targetId && (
                <div>
                    <div>Target ID: {request.targetId}</div>
                </div>
            )}
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
                    className="bg-green-600" 
                    onClick={() => onChange()}
                >
                    Approve
                </Button>
                <Button 
                    className="bg-red-500"
                    onClick={() => onChange()}
                >
                    Reject
                </Button>
            </div>
        </div>
    )
}

export default AddChangeRequest;