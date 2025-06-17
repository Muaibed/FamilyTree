// src/app/api/spouseRelationship/route.ts

import {createSpouseRelationship, deleteRelation, getAllRelations, updateRelationStatus} from '@/lib/spouseRelationship';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { personId, spouseId, startDate, endDate, isActive } = await req.json();

    const newRelation = await createSpouseRelationship({
      person1Id:Number(personId),
      person2Id:Number(spouseId),
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

export async function GET() {
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
    const { personId, spouseId, isActive, startDate, endDate } = await req.json();

    const data = {
      personId,
      spouseId,
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
      const { person1Id, person2Id } = await req.json();
  
      if (!person1Id || !person2Id) {
        return new Response("IDs are required", { status: 400 });
      }

      await deleteRelation(+person1Id, +person2Id);
  
      return new Response("Relation deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to delete relation", { status: 500 });
    }
  }