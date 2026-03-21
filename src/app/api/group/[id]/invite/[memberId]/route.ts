import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { respondToInvite } from '@/lib/db/group';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { memberId } = await params;

    // Ensure the invite belongs to the current user
    const member = await prisma.groupMember.findUnique({
      where: { id: memberId },
      select: { userId: true, inviteStatus: true },
    });
    if (!member) return NextResponse.json({ error: 'Invite not found' }, { status: 404 });
    if (member.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (member.inviteStatus !== 'PENDING') {
      return NextResponse.json({ error: 'Invite already responded to' }, { status: 400 });
    }

    const { action } = await req.json(); // "ACCEPT" | "REJECT"
    if (action !== 'ACCEPT' && action !== 'REJECT') {
      return NextResponse.json({ error: 'action must be ACCEPT or REJECT' }, { status: 400 });
    }

    const updated = await respondToInvite(memberId, action);
    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}