import { isAdmin } from '@/lib/session';
import { deleteRelationById, getRelationById, updateRelationStatusById } from '@/lib/spouseRelationship';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Relation ID is required", { status: 400 });
    }

    const relation = await getRelationById(id);

    return NextResponse.json(relation);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isPermitted = await isAdmin();
    const { id } = await params;

    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { isActive, startDate, endDate } = await req.json();

    const data = {
      isActive,
      startDate,
      endDate
    }

    if (!id) {
      return new Response("Relation ID is required", { status: 400});
    }

    await updateRelationStatusById(id, data);

    return NextResponse.json("Updated successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update person", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const isPermitted = await isAdmin();
      const { id } = await params;

      if (!isPermitted) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
  
      if (!id) {
        return new Response("Relation ID is required", { status: 400 });
      }

      await deleteRelationById(id);
  
      return new Response("Relation deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to delete relation", { status: 500 });
    }
  }