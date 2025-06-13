import { SpouseRelationship } from '@/types/family';
import { prisma } from './prisma';

export const getAllRelations = async () => {
  const relations = await prisma.spouseRelationship.findMany();
  let formattedRelations: SpouseRelationship[] = [];

  relations.forEach((r) => formattedRelations.push({id: `${r.id}`, person:`${r.personId}`, spouse:`${r.spouseId}`, isActive:r.isActive}))

  return formattedRelations;
};

export const createSpouseRelationship = async (data: {
  person1Id: number;
  person2Id: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}) => {
  return prisma.spouseRelationship.create({
    data: {
      personId: data.person1Id,
      spouseId: data.person2Id,
      isActive: data.isActive,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });
};


export const updateRelationStatus = async (personId: number, spouseId: number, isActive: boolean, startDate: Date, endDate: Date) => {
    await prisma.spouseRelationship.update({
      where: {
        personId_spouseId: {
          personId: personId,
          spouseId: spouseId,
        },
      },
      data: {
        isActive: isActive,
        startDate: startDate,
        endDate: endDate,
      },
    });

}

export const deleteRelationById = async (id: number) => {
  return prisma.spouseRelationship.delete({
    where: { id },
  });
}; 

export const deleteRelation = async (person1Id: number, person2Id: number) => {
  return prisma.spouseRelationship.deleteMany({
    where: {
      OR: [
        { personId: person1Id, spouseId: person2Id},
        { personId: person2Id, spouseId: person1Id},
      ]
    },
  });
}; 
