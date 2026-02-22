import { getDisplayedFamilies } from '@/lib/db/family';
import { isAdmin } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET(req:Request) {
  try {
    const families = await getDisplayedFamilies();

    return NextResponse.json(families);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
