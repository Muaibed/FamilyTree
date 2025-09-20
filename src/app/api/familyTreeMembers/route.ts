import { NextResponse } from 'next/server';
import { PersonWithRelations } from '@/types/family';
import { getAllPersons, getAllPersonsWithSameOwner } from '@/lib/person';
import { getUserId } from '@/lib/session';

export async function GET() {
  try {
    const userId = await getUserId()
    let members:PersonWithRelations[];

    if (!userId)
      return NextResponse.json("Not Found", {status: 404})
    
    members = await getAllPersonsWithSameOwner(userId)
   
    return NextResponse.json(members);
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong ' + err }, { status: 500 });
  }
}
