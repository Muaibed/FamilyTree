import { createFamily, getAllDisplayedFamilies, getAllFamilies, getFamilyByName } from '@/lib/family';
import { isAdmin } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const isPermitted = await isAdmin();
    
    if (!isPermitted) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, rootPersonId } = await req.json();

    const newFamily = await createFamily({
      name,
      rootPersonId,
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
    const families = await getAllFamilies();
    return NextResponse.json(families);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}