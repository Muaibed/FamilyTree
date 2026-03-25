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

    const uniqueFamilyIds = [...new Set(members.map((p) => p.familyId))];

    const familyPermMap = new Map<string, {
      canEdit: boolean;
      canDelete: boolean;
      canAddPerson: boolean;
      canAddSpouse: boolean;
    }>();

    await Promise.all(
      uniqueFamilyIds.map(async (familyId) => {
        const [canEdit, canDelete, canAddPerson, canAddSpouse] = await Promise.all([
          canDoFamilyPermission(userId, familyId, FamilyPermission.EDIT_PERSON),
          canDoFamilyPermission(userId, familyId, FamilyPermission.DELETE_PERSON),
          canDoFamilyPermission(userId, familyId, FamilyPermission.ADD_PERSON),
          canDoFamilyPermission(userId, familyId, FamilyPermission.ADD_SPOUSE),
        ]);
        familyPermMap.set(familyId, { canEdit, canDelete, canAddPerson, canAddSpouse });
      })
    );

    const withPerms = members.map((person) => ({
      ...person,
      ...familyPermMap.get(person.familyId),
    }));

    return NextResponse.json(withPerms);
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong ' + err }, { status: 500 });
  }
}
