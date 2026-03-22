import { NextResponse } from 'next/server';
import { getAllAccessiblePersons } from '@/lib/db/person';
import { getUserId } from '@/lib/session';
import { canDoFamilyPermission } from '@/lib/permissions';
import { FamilyPermission } from '@/generated/prisma';

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json('Not Found', { status: 404 });

    const members = await getAllAccessiblePersons(userId);

    const withPerms = await Promise.all(
      members.map(async (person) => {
        const [canEdit, canDelete, canAddPerson, canAddSpouse] = await Promise.all([
          canDoFamilyPermission(userId, person.familyId, FamilyPermission.EDIT_PERSON),
          canDoFamilyPermission(userId, person.familyId, FamilyPermission.DELETE_PERSON),
          canDoFamilyPermission(userId, person.familyId, FamilyPermission.ADD_PERSON),
          canDoFamilyPermission(userId, person.familyId, FamilyPermission.ADD_SPOUSE),
        ]);
        return { ...person, canEdit, canDelete, canAddPerson, canAddSpouse };
      })
    );

    return NextResponse.json(withPerms);
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong ' + err }, { status: 500 });
  }
}
