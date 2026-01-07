import { getUserId } from '@/lib/session';
import { getAllRelationsWithSameOwner } from '@/lib/spouseRelationship';
import { SpouseRelationshipWithPartners } from '@/types/family';
import { NextResponse } from 'next/server';


export async function GET(req:Request) {
  try { 
    const userId = await getUserId()
    let relations:SpouseRelationshipWithPartners[];

    if (!userId)
      return NextResponse.json("Not Found", {status: 404})

    relations = await getAllRelationsWithSameOwner(userId)

    return NextResponse.json(relations);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}