import { prisma } from '../prisma';

export const createFamily = async (data: {
  name: string;
  ownerId?: string;
}) => {
  return prisma.family.create({
    data: {
      name: data.name,
      ...(data.ownerId && {
        owner: { connect: { id: data.ownerId } }
      }),
    }
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

export const getAllFamiliesWithSameOwner = async (familyId: string) => {
  return await prisma.$transaction(async (tx) => {
    const family = await tx.family.findUnique({
      where: { id: familyId },
      select: { ownerId: true },
    });
    return tx.family.findMany({ where: { ownerId: family?.ownerId } });
  });
};

export const getAllFamiliesFromOwnerId = async (ownerId: string) => {
  return prisma.family.findMany({ where: { ownerId } });
};

export const updateFamily = async (id: string, data: { name?: string }) => {
  return prisma.family.update({ where: { id }, data: { name: data.name } });
};

export const deleteFamily = async (id: string) => {
  return prisma.family.delete({ where: { id } });
};