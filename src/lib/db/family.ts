import { prisma } from '../prisma';

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