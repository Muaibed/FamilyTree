import { prisma } from './prisma';

export const getAllRelations = async () => {
  return await prisma.spouseRelationship.findMany({
    include: {
      male: true,
      female: true,
    }
  });
};

export const getRelationById = async (id: string) => {
  return prisma.spouseRelationship.findUnique({
    where: { id },
  })
}

export const getAllRelationsForPerson = async (personId: string) => {
  return prisma.spouseRelationship.findMany({
    where: {
      OR: [
        { maleId: personId },
        { femaleId: personId },
      ]
    },
  })
}

export const createSpouseRelationship = async (data: {
  maleId: string; 
  femaleId: string;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}) => {
  return prisma.spouseRelationship.create({
    data: {
      maleId: data.maleId,
      femaleId: data.femaleId,
      isActive: data.isActive,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });
};


export const updateRelationStatus = async (data: {
  maleId: string;
  femaleId: string;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}) => {
    const { maleId, femaleId, isActive, startDate, endDate } = data;

    await prisma.spouseRelationship.update({
      where: {
        maleId_femaleId: {
          maleId: maleId,
          femaleId: femaleId,
        },
      },
      data: {
        isActive: isActive,
        startDate: startDate,
        endDate: endDate,
      },
    });

}

export const updateRelationStatusById = async (id:string, data: {
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}) => {
    const { isActive, startDate, endDate } = data;

    await prisma.spouseRelationship.update({
      where: { id },
      data: {
        isActive: isActive,
        startDate: startDate,
        endDate: endDate,
      },
    });

}

export const deleteRelationById = async (id: string) => {
  return prisma.spouseRelationship.delete({
    where: { id },
  });
}; 

export const deleteRelation = async (maleId: string, femaleId: string) => {
  return prisma.spouseRelationship.deleteMany({
    where: {
      OR: [
        { maleId, femaleId },
      ]
    },
  });
}; 
