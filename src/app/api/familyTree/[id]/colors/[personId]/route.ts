import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/session';
import { clearPersonColor } from '@/lib/db/familyTree';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string; personId: string }> }) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id: treeId, personId } = await params;
    await clearPersonColor(treeId, personId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}