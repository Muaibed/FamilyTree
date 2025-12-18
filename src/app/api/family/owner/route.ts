import { getAllFamiliesFromOwnerId } from '@/lib/family';
import { getUserId } from '@/lib/session';
import { FamilyWithRootPerson } from '@/types/family';
import { NextResponse } from 'next/server';


export async function GET(req:Request) {
  try { 
    const userId = await getUserId()
    let families:FamilyWithRootPerson[];

    if (!userId)
      return NextResponse.json("Not Found", {status: 404})

    families = await getAllFamiliesFromOwnerId(userId)

    return NextResponse.json(families);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}