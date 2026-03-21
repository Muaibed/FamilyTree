import { createFamily, getAllFamiliesFromOwnerId } from '@/lib/db/family';
import { getUserId } from '@/lib/session';
import { canDoGroupPermission } from '@/lib/permissions';
import { GroupPermission, ActivityAction, ActivityEntityType } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { logActivity } from '@/lib/activityLog';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name, groupId } = await req.json();

    if (groupId) {
      const permitted = await canDoGroupPermission(userId, groupId, GroupPermission.ADD_FAMILY);
      if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

      const newFamily = await createFamily({ name, groupId, creatorId: userId });
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
      await logActivity({ groupId, userId, userName: user?.name, action: ActivityAction.CREATE, entityType: ActivityEntityType.FAMILY, entityId: newFamily.id, entityName: name });
      return NextResponse.json(newFamily, { status: 201 });
    }

    const newFamily = await createFamily({ name, ownerId: userId });
    return NextResponse.json(newFamily, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json('Not Found', { status: 404 });

    const families = await getAllFamiliesFromOwnerId(userId);
    return NextResponse.json(families);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
