import { prisma } from '../prisma';
import { FamilyPermission, InviteStatus } from '@/generated/prisma';

export const createFamily = async (data: {
  name: string;
  // Solo context
  ownerId?: string;
  // Group context
  groupId?: string;
  creatorId?: string;
}) => {
  return prisma.family.create({
    data: {
      name: data.name,
      ...(data.ownerId && { owner: { connect: { id: data.ownerId } } }),
      ...(data.groupId && { group: { connect: { id: data.groupId } } }),
      ...(data.creatorId && { creator: { connect: { id: data.creatorId } } }),
    },
  });
};

export const getFamilyById = async (id: string) => {
  return prisma.family.findUnique({ where: { id } });
};

export const getFamilyByName = async (name: string) => {
  return prisma.family.findFirst({ where: { name } });
};

export const getAllFamilies = async () => {
  return prisma.family.findMany();
};

/** Get all solo families owned by a user. */
export const getAllFamiliesFromOwnerId = async (ownerId: string) => {
  return prisma.family.findMany({ where: { ownerId } });
};

/** Get all families the user can access: solo (ownerId) + group (accepted membership). */
export const getAllAccessibleFamilies = async (userId: string) => {
  return prisma.family.findMany({
    where: {
      OR: [
        { ownerId: userId },
        {
          group: {
            members: {
              some: {
                userId,
                inviteStatus: 'ACCEPTED',
              },
            },
          },
        },
      ],
    },
  });
};

/**
 * Get all families the user can add a person to:
 *  1. Solo families they own
 *  2. Group families where they are admin
 *  3. Group families where they are the creator
 *  4. Group families where they have a direct MemberFamilyPermission(ADD_PERSON)
 *  5. Group families covered by a PermissionGroup assignment that includes
 *     ADD_PERSON — unscoped (whole group) or scoped to specific families
 */
export const getAccessibleFamiliesForAddPerson = async (userId: string) => {


  const memberships = await prisma.groupMember.findMany({
    where: { userId, inviteStatus: InviteStatus.ACCEPTED },
    select: {
      groupId: true,
      isAdmin: true,
      familyPermissions: {
        where: { permission: FamilyPermission.ADD_PERSON },
        select: { familyId: true },
      },
      permissionGroupAssignments: {
        select: {
          familyScopes: { select: { familyId: true } },
          permissionGroup: {
            select: {
              familyPermissions: {
                where: { permission: FamilyPermission.ADD_PERSON },
                select: { permission: true },
              },
            },
          },
        },
      },
    },
  });

  const fullGroupIds = new Set<string>();
  const specificFamilyIds = new Set<string>();

  for (const m of memberships) {
    if (m.isAdmin) {
      fullGroupIds.add(m.groupId);
    } else {
      for (const fp of m.familyPermissions) specificFamilyIds.add(fp.familyId);
      for (const a of m.permissionGroupAssignments) {
        if (a.permissionGroup.familyPermissions.length === 0) continue;
        if (a.familyScopes.length === 0) {
          // Unscoped → covers all families in the group
          fullGroupIds.add(m.groupId);
        } else {
          for (const s of a.familyScopes) specificFamilyIds.add(s.familyId);
        }
      }
    }
  }

  type Where = { ownerId?: string; groupId?: { in: string[] } | null; creatorId?: string; id?: { in: string[] } };
  // ownerId covers both solo families and group-assigned families the user originally owned
  // creatorId covers families created inside a group (no ownerId set)
  const or: Where[] = [{ ownerId: userId }, { creatorId: userId }];

  if (fullGroupIds.size > 0)
    or.push({ groupId: { in: [...fullGroupIds] } });

  if (specificFamilyIds.size > 0)
    or.push({ id: { in: [...specificFamilyIds] } });

  return prisma.family.findMany({ where: { OR: or } });
};

/** Get all families in a group. */
export const getAllFamiliesInGroup = async (groupId: string) => {
  return prisma.family.findMany({ where: { groupId } });
};

/** Get other families with the same solo owner. */
export const getAllFamiliesWithSameOwner = async (familyId: string) => {
  return prisma.$transaction(async (tx) => {
    const family = await tx.family.findUnique({
      where: { id: familyId },
      select: { ownerId: true, groupId: true },
    });
    if (family?.ownerId) {
      return tx.family.findMany({ where: { ownerId: family.ownerId } });
    }
    if (family?.groupId) {
      return tx.family.findMany({ where: { groupId: family.groupId } });
    }
    return [];
  });
};

export const updateFamily = async (id: string, data: { name?: string, groupId?: string | null }) => {
  return prisma.family.update({ 
    where: { id }, 
    data: { 
      name: data.name, 
      ...(data.groupId !== undefined && {
        group: data.groupId ? { connect: { id: data.groupId } } : { disconnect: true }
      }), 
    } 
  });
};

export const deleteFamily = async (id: string) => {
  return prisma.family.delete({ where: { id } });
};