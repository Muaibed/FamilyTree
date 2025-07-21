import { NextRequest, NextResponse } from 'next/server';
import { createAddRequest, createDeleteRequest, createUpdateRequest, getAllChangeRequests } from '@/lib/changeRequest';
import { isAdmin } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const { action, targetModel, targetId, dataJSON, requesterName, requesterPhone, requesterId } = await req.json();

      let newChangeRequest;
      if (action == "ADD") {
        const data = {
          targetModel,
          dataJSON,
          requesterName,
          requesterPhone, 
          requesterId
        }
        newChangeRequest = await createAddRequest(data)
      }

      if (action == "UPDATE") {
        const data = {
            targetModel,
            targetId,
            dataJSON,
            requesterName,
            requesterPhone,
            requesterId,
        }
        newChangeRequest = await createUpdateRequest(data)

      }

      if (action == "DELETE") {
        const data = {
            targetModel,
            targetId,
            requesterName,
            requesterPhone,
            requesterId,
        }
        newChangeRequest = await createDeleteRequest(data)
      }
      
    return NextResponse.json(newChangeRequest, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const permitted = await isAdmin();

    if (!permitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const persons = await getAllChangeRequests();
    return NextResponse.json(persons);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}