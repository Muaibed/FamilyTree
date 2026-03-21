import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { canDoGroupPermission, canDoTreePermission } from '@/lib/permissions';
import { GroupPermission, TreePermission, ActivityAction, ActivityEntityType } from '@/generated/prisma';
import { createFamilyTree, getAllAccessibleFamilyTrees } from '@/lib/db/familyTree';
import { logActivity } from '@/lib/activityLog';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const trees = await getAllAccessibleFamilyTrees(userId);

    const withPerms = await Promise.all(
      trees.map(async (tree) => ({
        ...tree,
        canEdit: await canDoTreePermission(userId, tree.id, TreePermission.EDIT_TREE),
        canDelete: await canDoTreePermission(userId, tree.id, TreePermission.DELETE_TREE),
      }))
    );

    return NextResponse.json(withPerms);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { groupId } = body;

    if (groupId) {
      const permitted = await canDoGroupPermission(userId, groupId, GroupPermission.ADD_FAMILY_TREE);
      if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

      const tree = await createFamilyTree({ ...body, groupId, creatorId: userId, ownerId: undefined });
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
      await logActivity({ groupId, userId, userName: user?.name, action: ActivityAction.CREATE, entityType: ActivityEntityType.FAMILY_TREE, entityId: tree.id, entityName: tree.name });
      return NextResponse.json(tree, { status: 201 });
    }

    const tree = await createFamilyTree({ ...body, ownerId: userId });
    return NextResponse.json(tree, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
