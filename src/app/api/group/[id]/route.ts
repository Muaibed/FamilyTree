import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { isGroupAdmin } from '@/lib/permissions';
import { getGroupById, updateGroup, deleteGroup } from '@/lib/db/group';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const group = await getGroupById(id);
    if (!group) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Only accepted members can view group details
    const isMember = group.members.some(
      (m) => m.userId === userId && m.inviteStatus === 'ACCEPTED'
    );
    if (!isMember) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    return NextResponse.json(group);
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
    if (!await isGroupAdmin(userId, id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { name, description } = await req.json();
    const group = await updateGroup(id, { name, description });
    return NextResponse.json(group);
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
    if (!await isGroupAdmin(userId, id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await deleteGroup(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}