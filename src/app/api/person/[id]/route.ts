import { deletePerson, getPersonById, updatePerson } from '@/lib/db/person';
import { prisma } from '@/lib/prisma';
import { qstash } from '@/lib/qstash';
import { getUserId } from '@/lib/session';
import { canDoFamilyPermission } from '@/lib/permissions';
import { FamilyPermission, ActivityAction } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { logPersonActivity } from '@/lib/activityLog';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return new Response('Person ID is required', { status: 400 });
    const person = await getPersonById(id);
    return NextResponse.json(person);
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
    if (!id) return new Response('Person ID is required', { status: 400 });

    const person = await prisma.person.findUnique({ where: { id }, select: { familyId: true, firstName: true } });
    if (!person) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const permitted = await canDoFamilyPermission(userId, person.familyId, FamilyPermission.EDIT_PERSON);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { firstName, familyId, gender, kunya, fatherId, motherId, birthDate, deathDate, isDead } = await req.json();
    await updatePerson(id, { firstName, familyId, gender, kunya, fatherId, motherId, birthDate, deathDate, isDead });

    try {
      await qstash.publishJSON({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateFullName`,
        body: { personId: id },
      });
    } catch {
      // qstash failure should not block the update
    }

    const effectiveFamilyId = familyId ?? person.familyId;
    await logPersonActivity({ personId: id, familyId: effectiveFamilyId, userId, action: ActivityAction.UPDATE, entityName: firstName ?? person.firstName });

    return NextResponse.json('Updated successfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to update person: ' + error, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!id) return new Response('Person ID is required', { status: 400 });

    const person = await prisma.person.findUnique({ where: { id }, select: { familyId: true, firstName: true } });
    if (!person) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const permitted = await canDoFamilyPermission(userId, person.familyId, FamilyPermission.DELETE_PERSON);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await deletePerson(id);

    await logPersonActivity({ personId: id, familyId: person.familyId, userId, action: ActivityAction.DELETE, entityName: person.firstName });

    return new Response('Person deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete person: ' + error, { status: 500 });
  }
}
