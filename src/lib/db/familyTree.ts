import { prisma } from '../prisma';
import { Prisma } from '@/generated/prisma';
import { prepareTreeData } from '../tree';

const familyTreeInclude = {
  rootPerson: true,
  collapsedBranches: {
    include: { person: true }
  },
};

const personForTreeSelect = {
  id: true,
  firstName: true,
  fullName: true,
  gender: true,
  isDead: true,
  familyId: true,
  kunya: true,
  deathDate: true,
  father: { select: { motherId: true, familyId: true } },
  fatherChildren: { select: { id: true } },
  motherChildren: { select: { id: true } },
  maleSpouses: {
    where: { isActive: true },
    select: { female: { select: { fullName: true } } },
  },
  femaleSpouses: {
    where: { isActive: true },
    select: { male: { select: { fullName: true } } },
  },
} satisfies Prisma.PersonSelect;

export const createFamilyTree = async (data: {
  name: string;
  description?: string;
  rootPersonId: string;
  ownerId: string;
}) => {
  return prisma.familyTree.create({
    data: {
      name: data.name,
      description: data.description,
      rootPerson: { connect: { id: data.rootPersonId } },
      owner: { connect: { id: data.ownerId } },
    },
    include: familyTreeInclude,
  });
};

export const getFamilyTreeById = async (id: string) => {
  const tree = await prisma.familyTree.findUnique({
    where: { id },
    include: familyTreeInclude,
  });

  if (!tree) return null;

  // Cache hit — return stored JSON if it contains the display fields (fullName)
  if (tree.treeJson !== null && (tree.treeJson as any)?.attributes?.fullName !== undefined) return tree;

  // Cache miss — compute and store
  const persons = await prisma.person.findMany({
    where: { family: { ownerId: tree.ownerId } },
    select: personForTreeSelect,
  });

  const collapsedPersonIds = tree.collapsedBranches.map(b => b.personId);
  const familyId = tree.rootPerson.familyId;
  const computed = prepareTreeData(persons, tree.rootPersonId, familyId, collapsedPersonIds);

  if (!computed) return tree;

  return prisma.familyTree.update({
    where: { id },
    data: { treeJson: computed as unknown as Prisma.InputJsonValue },
    include: familyTreeInclude,
  });
};

export const getAllFamilyTreesFromOwnerId = async (ownerId: string) => {
  return prisma.familyTree.findMany({
    where: { ownerId },
    include: familyTreeInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const updateFamilyTree = async (id: string, data: {
  name?: string;
  description?: string;
  rootPersonId?: string;
}) => {
  return prisma.familyTree.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      treeJson: Prisma.DbNull,
      ...(data.rootPersonId && {
        rootPerson: { connect: { id: data.rootPersonId } }
      }),
    },
    include: familyTreeInclude,
  });
};

export const deleteFamilyTree = async (id: string) => {
  return prisma.familyTree.delete({ where: { id } });
};

export const addCollapsedBranch = async (treeId: string, personId: string) => {
  return prisma.$transaction([
    prisma.familyTreeCollapsedBranch.create({
      data: {
        tree: { connect: { id: treeId } },
        person: { connect: { id: personId } },
      },
    }),
    prisma.familyTree.update({
      where: { id: treeId },
      data: { treeJson: Prisma.DbNull },
    }),
  ]);
};

export const removeCollapsedBranch = async (treeId: string, personId: string) => {
  return prisma.$transaction([
    prisma.familyTreeCollapsedBranch.delete({
      where: { treeId_personId: { treeId, personId } },
    }),
    prisma.familyTree.update({
      where: { id: treeId },
      data: { treeJson: Prisma.DbNull },
    }),
  ]);
};
