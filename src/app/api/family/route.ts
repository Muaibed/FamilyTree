import { createFamily, getAllFamiliesWithSameOwner } from '@/lib/family';
import { getUserId, isAdmin } from '@/lib/session';
import { FamilyWithRootPerson } from '@/types/family';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const isPermitted = await isAdmin();
    
    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, rootPersonId, ownerId } = await req.json();

    const newFamily = await createFamily({
      name,
      rootPersonId,
      ownerId,
    });

    return NextResponse.json(newFamily, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET(req:Request) {
  try { 
    const userId = await getUserId()
    let families:FamilyWithRootPerson[];

    if (!userId)
      return NextResponse.json("Not Found", {status: 404})
    
    families = await getAllFamiliesWithSameOwner(userId)

    return NextResponse.json(families);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}