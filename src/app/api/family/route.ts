// src/app/api/family/route.ts

import { createFamily, getAllFamilies, getFamilyByName } from '@/lib/family';
import { NextRequest, NextResponse } from 'next/server';
import { getSessionSafe } from '@/lib/session';


const session = await getSessionSafe();
const isAdmin = session?.user?.role === "ADMIN";

export async function POST(req: NextRequest) {
  try {
    if (!session || !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, rootPersonId } = await req.json();

    const newFamily = await createFamily({
      name,
      rootPersonId: +rootPersonId,
    });

    return NextResponse.json(newFamily, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name")

    if (name)
      return NextResponse.json(await getFamilyByName(name));
    
    const families = await getAllFamilies();
    return NextResponse.json(families);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}