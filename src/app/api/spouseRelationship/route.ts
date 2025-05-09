// src/app/api/spouseRelationship/route.ts

import {createBidirectionalSpouseRelationship} from '@/lib/spouseRelationship';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { personId, spouseId, startDate, endDate, isActive } = await req.json();

    const newRelation = await createBidirectionalSpouseRelationship({
      person1Id:Number(personId),
      person2Id:Number(spouseId),
      ...(startDate ? { startDate: new Date(startDate) } : {}),
      ...(endDate ? { endDate: new Date(endDate) } : {}),
      ...(isActive ? { isActive: Boolean(isActive) } : {})
    });

    return NextResponse.json(newRelation, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}