import { prisma } from './prisma';

export const createFamily = async (data: {
  name: string,
  rootPersonId?: number
}) => {
  const { name, rootPersonId } = data;
  return prisma.family.create({
    data: {
        name,
        rootPerson: {
            connect: { id: rootPersonId },
        },
    }
  });
};

export const getFamilyById = async (id: number) => {
  return prisma.family.findUnique({
    where: { id },
  });
};

export const getAllFamilies = async () => {
  return prisma.family.findMany();
};

export const updateFamily = async (id: number, data: {
  name?: string,
  rootPersonId?: number
}) => {
  const { name, rootPersonId } = data;

  return prisma.family.update({
    where: { id },
    data: {
      name,
      rootPersonId
    },
  });
};

export const deleteFamily = async (id: number) => {
  return prisma.family.delete({
    where: { id },
  });
};