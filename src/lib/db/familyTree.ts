import { prisma } from '../prisma';
import { Prisma } from '@/generated/prisma';
import { prepareTreeData, collectPersonIds } from '../tree';
import type { TreeNode } from '@/types/tree';

const countNodes = (node: TreeNode): number =>
  1 + node.children.reduce((sum, c) => sum + countNodes(c), 0);

const countDead = (node: TreeNode): number =>
  (node.attributes?.isDead ? 1 : 0) +
  node.children.reduce((sum, c) => sum + countDead(c), 0);

const familyTreeInclude = {
  rootPerson: true,
  collapsedBranches: {
    include: { person: true }
  },
  personColors: true,
};

const personForTreeSelect = {
  id: true,
  firstName: true,
  fullName: true,
  gender: true,
  isDead: true,
  familyId: true,
  family: true,
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
  ownerId?: string;
  groupId?: string;
  creatorId?: string;
}) => {
  return prisma.familyTree.create({
    data: {
      name: data.name,
      description: data.description,
      rootPerson: { connect: { id: data.rootPersonId } },
      ...(data.ownerId && { owner: { connect: { id: data.ownerId } } }),
      ...(data.groupId && { group: { connect: { id: data.groupId } } }),
      ...(data.creatorId && { creator: { connect: { id: data.creatorId } } }),
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
  if (tree.treeJson !== null && (tree.treeJson as any)?.attributes?.fullName !== undefined) {
    // Backfill FamilyTreeMember if not yet populated (e.g. trees cached before the feature was added)
    const memberCount = await prisma.familyTreeMember.count({ where: { treeId: id } });
    if (memberCount === 0) {
      const personIds = collectPersonIds(tree.treeJson as unknown as TreeNode);
      if (personIds.length > 0) {
        await prisma.familyTreeMember.createMany({
          data: personIds.map((personId) => ({ treeId: id, personId })),
          skipDuplicates: true,
        });
      }
    }
    return tree;
  }

  // Cache miss — compute and store
  const persons = await prisma.person.findMany({
    where: tree.groupId
      ? { family: { groupId: tree.groupId } }
      : { family: { ownerId: tree.ownerId } },
    select: personForTreeSelect
  });

  const collapsedPersonIds = tree.collapsedBranches.map(b => b.personId);
  const familyId = tree.rootPerson.familyId;
  const computed = prepareTreeData(persons, tree.rootPersonId, familyId, collapsedPersonIds);

  if (!computed) return tree;

  const personIds = collectPersonIds(computed);

  const [updated] = await prisma.$transaction([
    prisma.familyTree.update({
      where: { id },
      data: {
        treeJson: computed as unknown as Prisma.InputJsonValue,
        membersCount: countNodes(computed),
        deadCount: countDead(computed),
        aliveCount: countNodes(computed) - countDead(computed),
      },
      include: familyTreeInclude,
    }),
    prisma.familyTreeMember.deleteMany({ where: { treeId: id } }),
    prisma.familyTreeMember.createMany({
      data: personIds.map((personId) => ({ treeId: id, personId })),
      skipDuplicates: true,
    }),
  ]);

  return updated;
};

export const getAllFamilyTreesFromOwnerId = async (ownerId: string) => {
  return prisma.familyTree.findMany({
    where: { ownerId },
    include: familyTreeInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getAllAccessibleFamilyTrees = async (userId: string) => {
  return prisma.familyTree.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { group: { members: { some: { userId, inviteStatus: 'ACCEPTED' } } } },
      ],
    },
    include: familyTreeInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const updateFamilyTree = async (id: string, data: {
  name?: string;
  description?: string;
  rootPersonId?: string;
  groupId?: string | null;
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
      ...(data.groupId !== undefined && {
        group: data.groupId ? { connect: { id: data.groupId } } : { disconnect: true }
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

export const setPersonColor = async (treeId: string, personId: string, linkColor: string, labelColor: string) => {
  return prisma.familyTreePersonColor.upsert({
    where: { treeId_personId: { treeId, personId } },
    create: { treeId, personId, linkColor, labelColor },
    update: { linkColor, labelColor },
  });
};

export const clearPersonColor = async (treeId: string, personId: string) => {
  return prisma.familyTreePersonColor.deleteMany({
    where: { treeId, personId },
  });
};
