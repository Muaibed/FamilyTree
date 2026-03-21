import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { getPendingInvitesForUser } from '@/lib/db/group';

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const invites = await getPendingInvitesForUser(userId);
    return NextResponse.json(invites);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}