import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/session';
import { setPersonColor } from '@/lib/db/familyTree';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id: treeId } = await params;
    const { personId, linkColor, labelColor } = await request.json();
    const color = await setPersonColor(treeId, personId, linkColor, labelColor);
    return NextResponse.json(color, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}