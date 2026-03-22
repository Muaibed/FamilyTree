import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { getGroupMembers } from '@/lib/db/group';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId } = await params;

    const membership = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const members = await getGroupMembers(groupId);
    return NextResponse.json(members);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}