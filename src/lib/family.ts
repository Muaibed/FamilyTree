import { prisma } from './prisma';

export const createFamily = async (data: {
  name: string,
  rootPersonId?: string
}) => {
  
  const { name, rootPersonId } = data;

  return prisma.family.create({
    data: {
      name,
      ...(rootPersonId && {
        rootPerson: { connect: { id: rootPersonId } }
      })
    }
  });
};

export const getFamilyById = async (id: string) => {
  return prisma.family.findUnique({
    where: { id },
    include: {
      rootPerson: true,
    }
  });
};

export const getFamilyByName = async (name: string) => {
  return prisma.family.findFirst({
    where: { name },
    include: {
      rootPerson: true,
    }
  });
};

export const getAllFamilies = async () => {
  return prisma.family.findMany({
    include: {
      rootPerson: true,
    }
  });
};

export const updateFamily = async (id: string, data: {
  name?: string,
  rootPersonId?: string
}) => {
  
  const { name, rootPersonId } = data;

  return prisma.family.update({
    where: { id },
    data: {
      name,
      ...(rootPersonId
      ? { rootPerson: { connect: { id: rootPersonId } } }
      : { rootPerson: { disconnect: true } }),
    },
  });
};

export const deleteFamily = async (id: string) => {
  return prisma.family.delete({
    where: { id },
  });
};