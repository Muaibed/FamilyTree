import { prisma } from "@/lib/prisma";
import {
  FamilyPermission,
  GroupPermission,
  InviteStatus,
  TreePermission,
} from "@/generated/prisma";

// ─── Solo resource helpers ────────────────────────────────────────────────────

/** Returns true if userId is the solo owner of this family (groupId is null). */
export async function isSoloFamilyOwner(
  userId: string,
  familyId: string
): Promise<boolean> {
  const family = await prisma.family.findUnique({
    where: { id: familyId },
    select: { ownerId: true, groupId: true },
  });
  if (!family || family.groupId !== null) return false;
  return family.ownerId === userId;
}

/** Returns true if userId is the solo owner of this tree (groupId is null). */
export async function isSoloTreeOwner(
  userId: string,
  treeId: string
): Promise<boolean> {
  const tree = await prisma.familyTree.findUnique({
    where: { id: treeId },
    select: { ownerId: true, groupId: true },
  });
  if (!tree || tree.groupId !== null) return false;
  return tree.ownerId === userId;
}


// ─── Group membership helper ──────────────────────────────────────────────────

/** Returns the accepted GroupMember record, or null. */
async function getAcceptedMember(userId: string, groupId: string) {
  return prisma.groupMember.findUnique({
    where: {
      groupId_userId: { groupId, userId },
    },
    select: { id: true, isAdmin: true },
  });
}


// ─── Group-level permission ───────────────────────────────────────────────────

/**
 * Can the user perform a group-level action (ADD_FAMILY, ADD_FAMILY_TREE)?
 * groupId must be the group the action will be performed in.
 */
export async function canDoGroupPermission(
  userId: string,
  groupId: string,
  permission: GroupPermission
): Promise<boolean> {
  const member = await prisma.groupMember.findUnique({
    where: {
      groupId_userId: { groupId, userId },
    },
    select: {
      id: true,
      isAdmin: true,
      inviteStatus: true,
    },
  });

  if (!member || member.inviteStatus !== InviteStatus.ACCEPTED) return false;
  if (member.isAdmin) return true;

  // Check individual group-level permission
  const individual = await prisma.memberGroupPermission.findUnique({
    where: { groupMemberId_permission: { groupMemberId: member.id, permission } },
  });
  if (individual) return true;

  // Check via permission group assignments
  const assignments = await prisma.memberPermissionGroupAssignment.findMany({
    where: { groupMemberId: member.id },
    include: {
      permissionGroup: {
        include: { groupPermissions: true },
      },
    },
  });

  for (const assignment of assignments) {
    const hasPermission = assignment.permissionGroup.groupPermissions.some(
      (e) => e.permission === permission
    );
    if (hasPermission) return true;
  }

  return false;
}


// Family-level permission 
export async function canDoFamilyPermission(
  userId: string,
  familyId: string,
  permission: FamilyPermission
): Promise<boolean> {
  // Fetch family and member context in parallel
  const [family, memberRaw] = await Promise.all([
    prisma.family.findUnique({
      where: { id: familyId },
      select: { ownerId: true, groupId: true, creatorId: true },
    }),
    prisma.groupMember.findFirst({
      where: { userId, group: { families: { some: { id: familyId } } }, inviteStatus: InviteStatus.ACCEPTED },
      select: {
        id: true,
        isAdmin: true,
        inviteStatus: true,
        familyPermissions: {
          where: { familyId, permission },
          select: { permission: true },
        },
        permissionGroupAssignments: {
          include: {
            permissionGroup: { include: { familyPermissions: true } },
            familyScopes: true,
          },
        },
      },
    }),
  ]);

  if (!family) return false;

  // Solo family: only the owner has any permission
  if (!family.groupId) {
    return family.ownerId === userId;
  }

  if (!memberRaw) return false;

  // Group admin gets everything
  if (memberRaw.isAdmin) return true;

  // Creator of this family gets everything on it
  if (family.creatorId === userId) return true;

  if (memberRaw.familyPermissions.length > 0) return true;

  // Check via permission group assignments (with family scope)
  for (const assignment of memberRaw.permissionGroupAssignments) {
    const hasPermission = assignment.permissionGroup.familyPermissions.some(
      (e) => e.permission === permission
    );
    if (!hasPermission) continue;

    const scoped = assignment.familyScopes.length > 0;
    if (!scoped) return true;
    if (assignment.familyScopes.some((s) => s.familyId === familyId)) return true;
  }

  return false;
}


// Tree-level permission 

export async function canDoTreePermission(
  userId: string,
  treeId: string,
  permission: TreePermission
): Promise<boolean> {
  // Fetch tree and member context in parallel
  const [tree, memberRaw] = await Promise.all([
    prisma.familyTree.findUnique({
      where: { id: treeId },
      select: { ownerId: true, groupId: true, creatorId: true },
    }),
    prisma.groupMember.findFirst({
      where: { userId, group: { familyTrees: { some: { id: treeId } } }, inviteStatus: InviteStatus.ACCEPTED },
      select: {
        id: true,
        isAdmin: true,
        inviteStatus: true,
        treePermissions: {
          where: { treeId, permission },
          select: { permission: true },
        },
        permissionGroupAssignments: {
          include: {
            permissionGroup: { include: { treePermissions: true } },
            treeScopes: true,
          },
        },
      },
    }),
  ]);

  if (!tree) return false;

  // Solo tree: only the owner has any permission
  if (!tree.groupId) {
    return tree.ownerId === userId;
  }

  if (!memberRaw) return false;

  // Group admin gets everything
  if (memberRaw.isAdmin) return true;

  // Creator of this tree gets everything on it
  if (tree.creatorId === userId) return true;

  if (memberRaw.treePermissions.length > 0) return true;

  // Check via permission group assignments (with tree scope)
  for (const assignment of memberRaw.permissionGroupAssignments) {
    const hasPermission = assignment.permissionGroup.treePermissions.some(
      (e) => e.permission === permission
    );
    if (!hasPermission) continue;

    const scoped = assignment.treeScopes.length > 0;
    if (!scoped) return true;
    if (assignment.treeScopes.some((s) => s.treeId === treeId)) return true;
  }

  return false;
}


// Group admin check 


export async function isGroupAdmin(
  userId: string,
  groupId: string
): Promise<boolean> {
  const member = await prisma.groupMember.findUnique({
    where: { groupId_userId: { groupId, userId } },
    select: { isAdmin: true, inviteStatus: true },
  });
  return (
    !!member &&
    member.inviteStatus === InviteStatus.ACCEPTED &&
    member.isAdmin
  );
}