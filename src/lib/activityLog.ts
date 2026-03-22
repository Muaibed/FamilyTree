import { prisma } from './prisma';
import { ActivityAction, ActivityEntityType } from '@/generated/prisma';
import { collectPersonIds } from './tree';
import type { TreeNode } from '@/types/tree';

export async function getGroupIdsForPerson(personId: string, familyId: string): Promise<string[]> {
  // Backfill FamilyTreeMember for any group trees that are cached but not yet indexed
  const unpopulated = await prisma.familyTree.findMany({
    where: { groupId: { not: null }, treeJson: { not: { equals: null } }, members: { none: {} } },
    select: { id: true, treeJson: true },
  });
  if (unpopulated.length > 0) {
    await Promise.all(
      unpopulated.map(async (t) => {
        try {
          const ids = collectPersonIds(t.treeJson as unknown as TreeNode);
          if (ids.length > 0) {
            await prisma.familyTreeMember.createMany({
              data: ids.map((pid) => ({ treeId: t.id, personId: pid })),
              skipDuplicates: true,
            });
          }
        } catch {
          // malformed treeJson — skip silently
        }
      }),
    );
  }

  const [family, memberships] = await Promise.all([
    prisma.family.findUnique({ where: { id: familyId }, select: { groupId: true } }),
    prisma.familyTreeMember.findMany({
      where: { personId },
      select: { familyTree: { select: { groupId: true } } },
    }),
  ]);

  const ids = new Set<string>();
  if (family?.groupId) ids.add(family.groupId);
  for (const m of memberships) {
    if (m.familyTree.groupId) ids.add(m.familyTree.groupId);
  }
  return [...ids];
}

/** Log a person action to every group the person belongs to. */
export async function logPersonActivity({
  personId,
  familyId,
  userId,
  userName,
  action,
  entityName,
}: {
  personId: string;
  familyId: string;
  userId: string;
  userName?: string | null;
  action: ActivityAction;
  entityName?: string | null;
}) {
  const groupIds = await getGroupIdsForPerson(personId, familyId);
  await Promise.all(
    groupIds.map((groupId) =>
      logActivity({ groupId, userId, userName, action, entityType: ActivityEntityType.PERSON, entityId: personId, entityName }),
    ),
  );
}

export async function logActivity({
  groupId,
  userId,
  userName,
  action,
  entityType,
  entityId,
  entityName,
}: {
  groupId: string;
  userId: string;
  userName?: string | null;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId?: string;
  entityName?: string | null;
}) {
  try {
    await prisma.activityLog.create({
      data: { groupId, userId, userName, action, entityType, entityId, entityName },
    });
  } catch (e) {
    console.error('[activityLog] Failed to log activity:', e);
  }
}
