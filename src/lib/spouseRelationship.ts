import { prisma } from './prisma';

export const createBidirectionalSpouseRelationship = async (data: { person1Id: number; person2Id: number }) => {
  return prisma.$transaction([
    prisma.spouseRelationship.create({
      data: {
        personId: data.person1Id,
        spouseId: data.person2Id,
      }
    }),
    prisma.spouseRelationship.create({
      data: {
        personId: data.person2Id,
        spouseId: data.person1Id,
      }
    })
  ]);
}