import { updateChangeRequest } from "@/lib/changeRequest";
import { createPerson, deletePerson, updatePerson } from "@/lib/person";
import { isAdmin } from "@/lib/session";
import { createSpouseRelationship } from "@/lib/spouseRelationship";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {    
    const isPermitted = await isAdmin();
        
    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    const { approval, id, action, targetModel, targetId, data } = await req.json();
    let response;
    if (approval === "REJECTED") {
      response = await updateChangeRequest(id, approval)
    }

      if (action == "ADD") {
        if (targetModel === "PERSON")
            response = await createPerson(data);

        if (targetModel === "SPOUSERELATIONSHIP")
            response = await createSpouseRelationship(data);
      }

      if (action == "UPDATE") {
        if (targetModel === "PERSON")
            response = await updatePerson(targetId, data);
      }

      if (action == "DELETE") {
        if (targetModel === "PERSON")
            response = await deletePerson(targetId);
      }

      if (response && approval === "APPROVED")
        await updateChangeRequest(id, approval)
      
    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}