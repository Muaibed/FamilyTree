import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { isGroupAdmin } from '@/lib/permissions';
import { updatePermissionGroup, deletePermissionGroup } from '@/lib/db/group';
import { logActivity } from '@/lib/activityLog';
import { ActivityAction, ActivityEntityType } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string; pgId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId, pgId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { name, groupPermissions, familyPermissions, treePermissions } = await req.json();
    const pg = await updatePermissionGroup(pgId, { name, groupPermissions, familyPermissions, treePermissions });
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
    await logActivity({ groupId, userId, userName: user?.name, action: ActivityAction.UPDATE, entityType: ActivityEntityType.PERMISSION_GROUP, entityId: pgId, entityName: name });
    return NextResponse.json(pg);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string; pgId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId, pgId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const pg = await prisma.permissionGroup.findUnique({ where: { id: pgId }, select: { name: true } });
    await deletePermissionGroup(pgId);
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
    await logActivity({ groupId, userId, userName: user?.name, action: ActivityAction.DELETE, entityType: ActivityEntityType.PERMISSION_GROUP, entityId: pgId, entityName: pg?.name });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
