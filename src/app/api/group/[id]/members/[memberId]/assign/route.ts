import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/session';
import { isGroupAdmin } from '@/lib/permissions';
import { assignPermissionGroup, removePermissionGroupAssignment } from '@/lib/db/group';

// POST — assign a permission group (rule-template) to a member, with optional scope
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId, memberId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const {
      permissionGroupId,
      familyScopes, // string[] | undefined — undefined means apply to all
      treeScopes,   // string[] | undefined — undefined means apply to all
    } = await req.json();

    if (!permissionGroupId) return NextResponse.json({ error: 'permissionGroupId is required' }, { status: 400 });

    const assignment = await assignPermissionGroup({
      groupMemberId: memberId,
      permissionGroupId,
      familyScopes,
      treeScopes,
    });
    return NextResponse.json(assignment, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// DELETE — remove a specific permission group assignment
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: groupId } = await params;
    if (!await isGroupAdmin(userId, groupId)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { assignmentId } = await req.json();
    if (!assignmentId) return NextResponse.json({ error: 'assignmentId is required' }, { status: 400 });

    await removePermissionGroupAssignment(assignmentId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
