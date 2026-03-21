import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { isGroupAdmin } from '@/lib/permissions';
import { setMemberTreePermissions } from '@/lib/db/group';
import { TreePermission } from '@/generated/prisma';

// PUT — replace all tree-level permissions for this member on a specific tree
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; memberId: string; treeId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId, memberId, treeId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { permissions }: { permissions: TreePermission[] } = await req.json();
    await setMemberTreePermissions(memberId, treeId, permissions ?? []);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
