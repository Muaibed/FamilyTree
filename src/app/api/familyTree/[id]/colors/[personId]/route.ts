import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { canDoTreePermission } from '@/lib/permissions';
import { TreePermission } from '@/generated/prisma';
import { clearPersonColor } from '@/lib/db/familyTree';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string; personId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: treeId, personId } = await params;
    const permitted = await canDoTreePermission(userId, treeId, TreePermission.SET_COLORS);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await clearPersonColor(treeId, personId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}