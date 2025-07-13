import { isAdmin } from '@/lib/session';
import {createSpouseRelationship, deleteRelation, getAllRelations, getAllRelationsForPerson, updateRelationStatus} from '@/lib/spouseRelationship';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const isPermitted = await isAdmin();
    
    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { maleId, femaleId, startDate, endDate, isActive } = await req.json();

    const newRelation = await createSpouseRelationship({
      maleId,
      femaleId,
      isActive: Boolean(isActive),
      ...(startDate ? { startDate: new Date(startDate) } : {}),
      ...(endDate ? { endDate: new Date(endDate) } : {}),
    });

    return NextResponse.json(newRelation, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const relations = await getAllRelations();
    
    return NextResponse.json(relations);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const isPermitted = await isAdmin();

    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { maleId, femaleId, isActive, startDate, endDate } = await req.json();

    const data = {
      maleId,
      femaleId,
      isActive,
      startDate,
      endDate
    }

    await updateRelationStatus(data);

    return NextResponse.json("Updated successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update person", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
      const isPermitted = await isAdmin();

      if (!isPermitted) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      const { maleId, femaleId } = await req.json();
  
      if (!maleId || !femaleId) {
        return new Response("IDs are required", { status: 400 });
      }

      await deleteRelation(maleId, femaleId);
  
      return new Response("Relation deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to delete relation", { status: 500 });
    }
  }