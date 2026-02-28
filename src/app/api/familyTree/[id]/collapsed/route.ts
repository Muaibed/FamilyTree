import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/session';
import { addCollapsedBranch } from '@/lib/db/familyTree';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id: treeId } = await params;
    const { personId } = await request.json();
    const branch = await addCollapsedBranch(treeId, personId);
    return NextResponse.json(branch, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
