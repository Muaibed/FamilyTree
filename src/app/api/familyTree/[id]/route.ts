import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { canDoTreePermission } from '@/lib/permissions';
import { TreePermission, ActivityAction, ActivityEntityType } from '@/generated/prisma';
import { getFamilyTreeById, updateFamilyTree, deleteFamilyTree } from '@/lib/db/familyTree';
import { logActivity } from '@/lib/activityLog';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tree = await getFamilyTreeById(id);
    if (!tree) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(tree);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const permitted = await canDoTreePermission(userId, id, TreePermission.EDIT_TREE);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const before = await getFamilyTreeById(id);
    const tree = await updateFamilyTree(id, body);

    const oldGroup = before?.groupId ?? null;
    const newGroup = tree.groupId ?? null;
    const targetGroup = newGroup ?? oldGroup;

    if (targetGroup) {
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
      const action = !oldGroup && newGroup ? ActivityAction.CREATE
        : oldGroup && !newGroup ? ActivityAction.DELETE
        : ActivityAction.UPDATE;
      await logActivity({ groupId: targetGroup, userId, userName: user?.name, action, entityType: ActivityEntityType.FAMILY_TREE, entityId: id, entityName: tree.name });
    }

    return NextResponse.json(tree);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const permitted = await canDoTreePermission(userId, id, TreePermission.DELETE_TREE);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const tree = await getFamilyTreeById(id);
    await deleteFamilyTree(id);

    if (tree?.groupId) {
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
      await logActivity({ groupId: tree.groupId, userId, userName: user?.name, action: ActivityAction.DELETE, entityType: ActivityEntityType.FAMILY_TREE, entityId: id, entityName: tree.name });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
