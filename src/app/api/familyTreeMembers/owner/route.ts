import { getAllPersonsWithSameOwner } from '@/lib/person';
import { getUserId } from '@/lib/session';
import { PersonWithRelations } from '@/types/family';
import { NextResponse } from 'next/server';


export async function GET(req:Request) {
  try { 
    const userId = await getUserId()
    let members:PersonWithRelations[];

    if (!userId)
      return NextResponse.json("Not Found", {status: 404})

    members = await getAllPersonsWithSameOwner(userId)

    return NextResponse.json(members);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}