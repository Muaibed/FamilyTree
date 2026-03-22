import { getUserId } from '@/lib/session';
import { canDoFamilyPermission } from '@/lib/permissions';
import { FamilyPermission } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { deleteRelationById, getRelationById, updateRelationStatusById } from '@/lib/db/spouseRelationship';
import { NextResponse } from 'next/server';

/** Returns true if user has the given permission on either spouse's family. */
async function canActOnRelation(userId: string, relationId: string, permission: FamilyPermission) {
  const relation = await prisma.spouseRelationship.findUnique({
    where: { id: relationId },
    select: {
      male: { select: { familyId: true } },
      female: { select: { familyId: true } },
    },
  });
  if (!relation) return false;
  const [canMale, canFemale] = await Promise.all([
    canDoFamilyPermission(userId, relation.male.familyId, permission),
    canDoFamilyPermission(userId, relation.female.familyId, permission),
  ]);
  return canMale || canFemale;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return new Response('Relation ID is required', { status: 400 });
    const relation = await getRelationById(id);
    return NextResponse.json(relation);
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
    if (!id) return new Response('Relation ID is required', { status: 400 });

    const permitted = await canActOnRelation(userId, id, FamilyPermission.EDIT_SPOUSE);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { isActive, startDate, endDate } = await req.json();
    await updateRelationStatusById(id, { isActive, startDate, endDate });
    return NextResponse.json('Updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update relation', { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!id) return new Response('Relation ID is required', { status: 400 });

    const permitted = await canActOnRelation(userId, id, FamilyPermission.DELETE_SPOUSE);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await deleteRelationById(id);
    return new Response('Relation deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete relation', { status: 500 });
  }
}