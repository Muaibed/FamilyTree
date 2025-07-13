import { NextResponse } from 'next/server';
import { PersonWithRelations } from '@/types/family';
import { getAllPersons } from '@/lib/person';

export async function GET() {
  try {
    const members:PersonWithRelations[] = await getAllPersons()
   
    return NextResponse.json(members);
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong ' + err }, { status: 500 });
  }
}
