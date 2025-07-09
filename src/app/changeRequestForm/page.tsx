'use client'

import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation";

const changeRequestForm = () => {
    const searchParams = useSearchParams();
    const personId = searchParams.get("personId");

    return (
        <div className="flex flex-row items-center justify-center gap-4 w-full h-screen">
            <div className="flex flex-col bg-white p-4 gap-3 rounded-md">
                <Button 
                    className="hover:cursor-pointer"
                    onClick={() => window.location.href = `/changeRequestForm/editPerson?personId=${personId}`}
                >
                    Edit
                </Button>
                <Button 
                    className="hover:cursor-pointer"
                    onClick={() => window.location.href = `/changeRequestForm/addChild?parentId=${personId}`}
                >
                    Add Child
                </Button>
                <Button 
                    className="hover:cursor-pointer"
                    onClick={() => window.location.href = `/changeRequestForm/addSpouseRelationship?personId=${personId}`}
                >
                    Change Request for a Spouse Relationship
                </Button>
            </div>
        </div>
    )
}

export default changeRequestForm;