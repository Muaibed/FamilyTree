import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { isGroupAdmin } from '@/lib/permissions';
import { removeMember, setMemberAdmin } from '@/lib/db/group';

// PUT /api/group/[id]/members/[memberId] — toggle admin
export async function PUT(req: Request, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId, memberId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { isAdmin } = await req.json();
    const member = await setMemberAdmin(memberId, Boolean(isAdmin));
    return NextResponse.json(member);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// DELETE /api/group/[id]/members/[memberId] — remove member
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId, memberId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await removeMember(memberId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}