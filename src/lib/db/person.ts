import { prisma } from '../prisma';
import { Prisma } from '@/generated/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth';

export const createPerson = async (data: {
  firstName: string;
  familyId: string;
  gender: 'MALE' | 'FEMALE';
  kunya?: string;
  phone?: string;
  birthDate?: Date;
  deathDate?: Date;
  fatherId?: string;
  motherId?: string;
}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id)
    throw new Error ("Unauthorized")

  const user = await prisma.user.findUnique({ where: { id: session.user.id }});

  if (!user)
    throw new Error("Unable to identify user.")

  if (user.subscribtion != "PRO" && user.recordsCount! > 99)
    throw new Error("Limit Reached! Upgrade your plan to add more members.")

  const { firstName, familyId, gender, kunya, phone, birthDate, deathDate, fatherId, motherId } = data;

  let father;
  if (fatherId)
   father = await prisma.person.findUnique({ where: { id: fatherId }});

  const family = await prisma.family.findUnique({ where: { id: familyId }});

  const theSonOf = gender === "MALE" ? " بن " : " بنت ";
  const fullName = father ? firstName + theSonOf + father.fullName : firstName + " " + family?.name

  const [newPerson, updatedUser] = await prisma.$transaction([
    prisma.person.create({
      data: {
        firstName: firstName,
        fullName,
        family: { connect: { id: familyId } },
        gender: gender,
        kunya,
        phone: phone,
        birthDate: birthDate,
        deathDate: deathDate,
        father: fatherId ? { connect: { id: fatherId } } : undefined,
        mother: motherId ? { connect: { id: motherId } } : undefined,
      }
    }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        recordsCount: { increment : 1 }
      }
    })
  ]);

  // Invalidate tree cache: solo trees by ownerId, group trees by groupId
  const familyWithOwnerAndGroupId = await prisma.family.findUnique({
    where: { id: familyId },
    select: { ownerId: true, groupId: true },
  });
  if (familyWithOwnerAndGroupId?.ownerId) {
    await prisma.familyTree.updateMany({
      where: { ownerId: familyWithOwnerAndGroupId.ownerId },
      data: { treeJson: Prisma.DbNull },
    });
  }
  if (familyWithOwnerAndGroupId?.groupId) {
    await prisma.familyTree.updateMany({
      where: { groupId: familyWithOwnerAndGroupId.groupId },
      data: { treeJson: Prisma.DbNull },
    });
  }

  return [newPerson, updatedUser];
};

export const getPersonById = async (id: string) => {
  return prisma.person.findUnique({
    where: { id },
    include: {
      father: true,
      mother: true,
      fatherChildren: true,
      motherChildren: true,
      maleSpouses: {
        include: { male: true, female: true }
      },
      femaleSpouses: {
        include: { male: true, female: true }
      },
      family: true,
    },
  });
};

export const getAllPersons = async () => {
  return prisma.person.findMany({
    include: {
           father: true,
           mother: true,
           fatherChildren: true,
           motherChildren: true,
           maleSpouses: {
            include: {
              male: true,
              female: true,
            }
           },
           femaleSpouses: {
            include: {
              male: true,
              female: true,
            }
           },
           family: true,
         },
  });
};

export const getAllPersonsWithSameOwner = async (userId: string) => {
  return prisma.person.findMany({
    where: {
      family: {
        ownerId: userId
      }
    },
    include: {
           father: true,
           mother: true,
           fatherChildren: true,
           motherChildren: true,
           maleSpouses: {
            include: {
              male: true,
              female: true,
            }
           },
           femaleSpouses: {
            include: {
              male: true,
              female: true,
            }
           },
           family: true,
         },
  });
};

export const getAllAccessiblePersons = async (userId: string) => {
  return prisma.person.findMany({
    where: {
      family: {
        OR: [
          { ownerId: userId },
          { group: { members: { some: { userId, inviteStatus: 'ACCEPTED' } } } },
        ],
      },
    },
    include: {
      father: true,
      mother: true,
      fatherChildren: true,
      motherChildren: true,
      maleSpouses: { include: { male: true, female: true } },
      femaleSpouses: { include: { male: true, female: true } },
      family: true,
    },
  });
};

export const getAllMales = async () => {
  return prisma.person.findMany({
    where: {
      gender: "MALE",
    },
  });
};

export const getAllFemales = async () => {
  return prisma.person.findMany({
    where: {
      gender: "FEMALE",
    },
  });
};

export const getAllSpouses = async (personId: string) => {
  const person = await prisma.person.findUnique({
    where: {
      id: personId
    },
    include: {
      maleSpouses: {
        include: {
          male: true,
          female: true,
        }
      },
      femaleSpouses: {
        include: {
          male: true,
          female: true,
        }
      },
    }
  });

  if (!person) {
    return null;
  }

  let spouses;
  if (person.gender === "MALE")
    spouses = person.maleSpouses.map(s => s.female);
  if (person.gender === "FEMALE")
    spouses = person.femaleSpouses.map(s => s.male);

  return spouses;
};

export const updatePerson = async (id: string, data: {
  firstName?: string;
  familyId?: string;
  gender?: 'MALE' | 'FEMALE';
  kunya?: string;
  phone?: string;
  isDead: boolean;
  fatherId?: string;
  motherId?: string;
  birthDate?: Date;
  deathDate?: Date;
}) => {
  const { firstName, familyId, gender, kunya, phone, birthDate, deathDate, fatherId, motherId, isDead } = data;

  const result = await prisma.person.update({
    where: { id },
    data: {
      firstName,
      family: familyId ? { connect: { id: familyId } } : undefined,
      gender,
      kunya,
      phone,
      isDead,
      birthDate,
      deathDate,
      father: fatherId ? { connect: { id: fatherId } } : undefined,
      mother: motherId ? { connect: { id: motherId } } : undefined,
    },
    include: { family: { select: { ownerId: true } } },
  });

  if (result.family.ownerId) {
    await prisma.familyTree.updateMany({
      where: { ownerId: result.family.ownerId },
      data: { treeJson: Prisma.DbNull },
    });
  }

  return result;
};

export const deletePerson = async (id: string) => {
  const existing = await prisma.person.findUnique({
    where: { id },
    select: { family: { select: { ownerId: true } } },
  });

  const result = await prisma.person.delete({ where: { id } });

  if (existing?.family.ownerId) {
    await prisma.familyTree.updateMany({
      where: { ownerId: existing.family.ownerId },
      data: { treeJson: Prisma.DbNull },
    });
  }

  return result;
};
