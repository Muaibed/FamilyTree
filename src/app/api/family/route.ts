import { createFamily } from '@/lib/db/family';
import { isAdmin } from '@/lib/session';
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