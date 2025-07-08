'use client'

import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation";

const changeRequestForm = () => {
    const searchParams = useSearchParams();
    const personId = searchParams.get("personId");

    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <Button 
                className="hover:cursor-pointer"
                onClick={() => window.location.href = `/changeRequestForm/person?personId=${personId}`}
            >
                Change Request for a Person
            </Button>
            <Button 
                className="hover:cursor-pointer"
                onClick={() => window.location.href = "/changeRequestForm/spouseRelationship"}
            >
                Change Request for a Spouse Relationship
            </Button>
        </div>
    )
}

export default changeRequestForm;