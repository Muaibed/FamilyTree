import { getUserId } from '@/lib/session';
import { canDoFamilyPermission } from '@/lib/permissions';
import { FamilyPermission, ActivityAction, ActivityEntityType } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import {
  createSpouseRelationship,
  deleteRelation,
  updateRelationStatus,
  getAllRelationsWithSameOwner,
} from '@/lib/db/spouseRelationship';
import { NextResponse } from 'next/server';
import { logActivity } from '@/lib/activityLog';

async function canActOnSpouses(userId: string, maleId: string, femaleId: string, permission: FamilyPermission) {
  const [male, female] = await Promise.all([
    prisma.person.findUnique({ where: { id: maleId }, select: { familyId: true } }),
    prisma.person.findUnique({ where: { id: femaleId }, select: { familyId: true } }),
  ]);
  const checks = await Promise.all([
    male ? canDoFamilyPermission(userId, male.familyId, permission) : Promise.resolve(false),
    female ? canDoFamilyPermission(userId, female.familyId, permission) : Promise.resolve(false),
  ]);
  return checks.some(Boolean);
}

async function getGroupIdForSpouses(maleId: string, femaleId: string): Promise<string | null> {
  const [male, female] = await Promise.all([
    prisma.person.findUnique({ where: { id: maleId }, select: { family: { select: { groupId: true } } } }),
    prisma.person.findUnique({ where: { id: femaleId }, select: { family: { select: { groupId: true } } } }),
  ]);
  return male?.family?.groupId ?? female?.family?.groupId ?? null;
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { maleId, femaleId, startDate, endDate, isActive } = await req.json();

    const permitted = await canActOnSpouses(userId, maleId, femaleId, FamilyPermission.ADD_SPOUSE);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const newRelation = await createSpouseRelationship({
      maleId,
      femaleId,
      isActive: Boolean(isActive),
      ...(startDate ? { startDate: new Date(startDate) } : {}),
      ...(endDate ? { endDate: new Date(endDate) } : {}),
    });

    const groupId = await getGroupIdForSpouses(maleId, femaleId);
    if (groupId) {
      const [user, male, female] = await Promise.all([
        prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
        prisma.person.findUnique({ where: { id: maleId }, select: { firstName: true } }),
        prisma.person.findUnique({ where: { id: femaleId }, select: { firstName: true } }),
      ]);
      await logActivity({ groupId, userId, userName: user?.name, action: ActivityAction.CREATE, entityType: ActivityEntityType.SPOUSE_RELATIONSHIP, entityId: newRelation.id, entityName: `${male?.firstName} - ${female?.firstName}` });
    }

    return NextResponse.json(newRelation, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json('Not Found', { status: 404 });
    const relations = await getAllRelationsWithSameOwner(userId);
    return NextResponse.json(relations);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { maleId, femaleId, isActive, startDate, endDate } = await req.json();

    const permitted = await canActOnSpouses(userId, maleId, femaleId, FamilyPermission.EDIT_SPOUSE);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await updateRelationStatus({ maleId, femaleId, isActive, startDate, endDate });

    const groupId = await getGroupIdForSpouses(maleId, femaleId);
    if (groupId) {
      const [user, male, female] = await Promise.all([
        prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
        prisma.person.findUnique({ where: { id: maleId }, select: { firstName: true } }),
        prisma.person.findUnique({ where: { id: femaleId }, select: { firstName: true } }),
      ]);
      await logActivity({ groupId, userId, userName: user?.name, action: ActivityAction.UPDATE, entityType: ActivityEntityType.SPOUSE_RELATIONSHIP, entityName: `${male?.firstName} - ${female?.firstName}` });
    }

    return NextResponse.json('Updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update relation', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { maleId, femaleId } = await req.json();
    if (!maleId || !femaleId) return new Response('IDs are required', { status: 400 });

    const permitted = await canActOnSpouses(userId, maleId, femaleId, FamilyPermission.DELETE_SPOUSE);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const groupId = await getGroupIdForSpouses(maleId, femaleId);
    const [male, female] = await Promise.all([
      prisma.person.findUnique({ where: { id: maleId }, select: { firstName: true } }),
      prisma.person.findUnique({ where: { id: femaleId }, select: { firstName: true } }),
    ]);

    await deleteRelation(maleId, femaleId);

    if (groupId) {
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
      await logActivity({ groupId, userId, userName: user?.name, action: ActivityAction.DELETE, entityType: ActivityEntityType.SPOUSE_RELATIONSHIP, entityName: `${male?.firstName} - ${female?.firstName}` });
    }

    return new Response('Relation deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete relation', { status: 500 });
  }
}
