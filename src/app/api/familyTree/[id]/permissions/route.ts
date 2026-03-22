import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { canDoTreePermission } from '@/lib/permissions';
import { TreePermission } from '@/generated/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: treeId } = await params;

    const [canCollapseBranches, canSetColors, canEditTree] = await Promise.all([
      canDoTreePermission(userId, treeId, TreePermission.COLLAPSE_BRANCHES),
      canDoTreePermission(userId, treeId, TreePermission.SET_COLORS),
      canDoTreePermission(userId, treeId, TreePermission.EDIT_TREE),
    ]);

    return NextResponse.json({ canCollapseBranches, canSetColors, canEditTree });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
