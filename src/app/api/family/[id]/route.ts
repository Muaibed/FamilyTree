import { deleteFamily, getFamilyById, updateFamily } from '@/lib/db/family';
import { getUserId } from '@/lib/session';
import { canDoFamilyPermission } from '@/lib/permissions';
import { FamilyPermission, ActivityAction, ActivityEntityType } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { logActivity } from '@/lib/activityLog';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return new Response('Family ID is required', { status: 400 });
    const family = await getFamilyById(id);
    return NextResponse.json(family);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!id) return new Response('Family ID is required', { status: 400 });

    const permitted = await canDoFamilyPermission(userId, id, FamilyPermission.EDIT_FAMILY);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const before = await getFamilyById(id);
    await updateFamily(id, { name: body.name, groupId: 'groupId' in body ? (body.groupId || null) : undefined });
    const after = await getFamilyById(id);

    const oldGroup = before?.groupId ?? null;
    const newGroup = after?.groupId ?? null;
    const targetGroup = newGroup ?? oldGroup;

    if (targetGroup) {
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
      const action = !oldGroup && newGroup ? ActivityAction.CREATE
        : oldGroup && !newGroup ? ActivityAction.DELETE
        : ActivityAction.UPDATE;
      await logActivity({ groupId: targetGroup, userId, userName: user?.name, action, entityType: ActivityEntityType.FAMILY, entityId: id, entityName: after?.name ?? before?.name });
    }

    return NextResponse.json('Updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to update family: ' + error, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!id) return new Response('Family ID is required', { status: 400 });

    const permitted = await canDoFamilyPermission(userId, id, FamilyPermission.DELETE_FAMILY);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const family = await getFamilyById(id);

    await deleteFamily(id);

    if (family?.groupId) {
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
      await logActivity({ groupId: family.groupId, userId, userName: user?.name, action: ActivityAction.DELETE, entityType: ActivityEntityType.FAMILY, entityId: id, entityName: family.name });
    }

    return new Response('Family deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete family', { status: 500 });
  }
}
