import { prisma } from './prisma';

export const createFamily = async (data: {
  name: string,
  rootPersonId?: number | string
}) => {
  
  const { name, rootPersonId } = data;

  return prisma.family.create({
    data: {
      name,
      ...(rootPersonId && {
        rootPerson: { connect: { id: +rootPersonId } }
      })
    }
  });
};

export const getFamilyById = async (id: number) => {
  return prisma.family.findUnique({
    where: { id },
  });
};

export const getFamilyByName = async (name: string) => {
  return prisma.family.findFirst({
    where: { name },
  });
};

export const getAllFamilies = async () => {
  return prisma.family.findMany();
};

export const updateFamily = async (id: number, data: {
  name?: string,
  rootPersonId?: number | string
}) => {
  
  const { name, rootPersonId } = data;

  return prisma.family.update({
    where: { id },
    data: {
      name,
      ...(rootPersonId
      ? { rootPerson: { connect: { id: +rootPersonId } } }
      : { rootPerson: { disconnect: true } }),
    },
  });
};

export const deleteFamily = async (id: number) => {
  return prisma.family.delete({
    where: { id },
  });
};