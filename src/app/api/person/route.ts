import { NextResponse } from 'next/server';
import { createPerson } from '@/lib/db/person';
import { getUserId } from '@/lib/session';
import { canDoFamilyPermission } from '@/lib/permissions';
import { FamilyPermission, ActivityAction } from '@/generated/prisma';
import { logPersonActivity } from '@/lib/activityLog';

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { firstName, familyId, gender, kunya, birthDate, deathDate, fatherId, motherId } = await req.json();

    const permitted = await canDoFamilyPermission(userId, familyId, FamilyPermission.ADD_PERSON);
    if (!permitted) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const [newPerson] = await createPerson({
      firstName,
      familyId,
      gender,
      kunya,
      ...(birthDate ? { birthDate: new Date(birthDate) } : {}),
      ...(deathDate ? { deathDate: new Date(deathDate) } : {}),
      ...(fatherId ? { fatherId } : {}),
      ...(motherId ? { motherId } : {}),
    });

    await logPersonActivity({ personId: newPerson.id, familyId, userId, action: ActivityAction.CREATE, entityName: firstName });

    return NextResponse.json(newPerson, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
