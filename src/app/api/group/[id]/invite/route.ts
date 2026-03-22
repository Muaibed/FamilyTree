import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { isGroupAdmin } from '@/lib/permissions';
import { inviteMemberByEmail } from '@/lib/db/group';
import { logActivity } from '@/lib/activityLog';
import { ActivityAction, ActivityEntityType } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const member = await inviteMemberByEmail(groupId, email);
    const [actor, invitee] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
      prisma.user.findUnique({ where: { id: member.userId }, select: { name: true, email: true } }),
    ]);
    await logActivity({ groupId, userId, userName: actor?.name, action: ActivityAction.INVITE, entityType: ActivityEntityType.GROUP_MEMBER, entityId: member.id, entityName: invitee?.name ?? invitee?.email });
    return NextResponse.json(member, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}