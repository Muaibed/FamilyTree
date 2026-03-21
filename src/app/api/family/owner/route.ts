import { getAllAccessibleFamilies } from '@/lib/db/family';
import { getUserId } from '@/lib/session';
import { canDoFamilyPermission } from '@/lib/permissions';
import { FamilyPermission } from '@/generated/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json('Not Found', { status: 404 });

    const families = await getAllAccessibleFamilies(userId);

    const withPerms = await Promise.all(
      families.map(async (family) => ({
        ...family,
        canEdit: await canDoFamilyPermission(userId, family.id, FamilyPermission.EDIT_FAMILY),
        canDelete: await canDoFamilyPermission(userId, family.id, FamilyPermission.DELETE_FAMILY),
      }))
    );

    return NextResponse.json(withPerms);
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
