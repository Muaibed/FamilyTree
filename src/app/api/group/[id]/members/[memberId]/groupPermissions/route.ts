import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { isGroupAdmin } from '@/lib/permissions';
import { setMemberGroupPermissions } from '@/lib/db/group';
import { GroupPermission } from '@/generated/prisma';

// PUT — replace all group-level permissions for this member
export async function PUT(req: Request, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId, memberId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { permissions }: { permissions: GroupPermission[] } = await req.json();
    await setMemberGroupPermissions(memberId, permissions ?? []);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
