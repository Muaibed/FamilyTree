import { deleteChangeRequest, getChangeRequestById, updateChangeRequest } from '@/lib/changeRequest';
import { isAdmin } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  try {
    const permitted = await isAdmin();

    if (!permitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Change Request ID is required", { status: 400 });
    }

    const changeRequest = await getChangeRequestById(id);

    return NextResponse.json(changeRequest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const permitted = await isAdmin();
    const { id } = await params;

    if (!permitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { status } = await req.json();

    if (!id) {
      return new Response("Change Request ID is required", { status: 400});
    }

    await updateChangeRequest(id, status);

    return NextResponse.json("Updated successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update change request", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const permitted = await isAdmin();
      const { id } = await params;

      if (permitted) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    
      if (!id) {
        return new Response("Change Request ID is required", { status: 400 });
      }
  
      await deleteChangeRequest(id);
  
      return new Response("Chagne Request deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to delete change request", { status: 500 });
    }
  }
