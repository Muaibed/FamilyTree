import { getUserId } from '@/lib/session';
import { getAllAccessibleRelations } from '@/lib/db/spouseRelationship';
import { canDoFamilyPermission } from '@/lib/permissions';
import { FamilyPermission } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json('Not Found', { status: 404 });

    const relations = await getAllAccessibleRelations(userId);

    const withPerms = await Promise.all(
      relations.map(async (rel) => {
        const [male, female] = await Promise.all([
          prisma.person.findUnique({ where: { id: rel.maleId }, select: { familyId: true } }),
          prisma.person.findUnique({ where: { id: rel.femaleId }, select: { familyId: true } }),
        ]);
        const [canEditMale, canEditFemale, canDeleteMale, canDeleteFemale] = await Promise.all([
          male ? canDoFamilyPermission(userId, male.familyId, FamilyPermission.EDIT_SPOUSE) : Promise.resolve(false),
          female ? canDoFamilyPermission(userId, female.familyId, FamilyPermission.EDIT_SPOUSE) : Promise.resolve(false),
          male ? canDoFamilyPermission(userId, male.familyId, FamilyPermission.DELETE_SPOUSE) : Promise.resolve(false),
          female ? canDoFamilyPermission(userId, female.familyId, FamilyPermission.DELETE_SPOUSE) : Promise.resolve(false),
        ]);
        return {
          ...rel,
          canEdit: canEditMale || canEditFemale,
          canDelete: canDeleteMale || canDeleteFemale,
        };
      })
    );

    return NextResponse.json(withPerms);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
