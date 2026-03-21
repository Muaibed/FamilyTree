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


// ─── Family-level permission ──────────────────────────────────────────────────

/**
 * Can the user perform a family-level action?
 * Handles both solo families (owner check) and group families (full permission check).
 */
export async function canDoFamilyPermission(
  userId: string,
  familyId: string,
  permission: FamilyPermission
): Promise<boolean> {
  const family = await prisma.family.findUnique({
    where: { id: familyId },
    select: { ownerId: true, groupId: true, creatorId: true },
  });

  if (!family) return false;

  // Solo family: only the owner has any permission
  if (!family.groupId) {
    return family.ownerId === userId;
  }

  // Group family
  const groupId = family.groupId;

  const member = await prisma.groupMember.findUnique({
    where: { groupId_userId: { groupId, userId } },
    select: { id: true, isAdmin: true, inviteStatus: true },
  });

  if (!member || member.inviteStatus !== InviteStatus.ACCEPTED) return false;

  // Group admin gets everything
  if (member.isAdmin) return true;

  // Creator of this family gets everything on it
  if (family.creatorId === userId) return true;

  // Check individual family permission
  const individual = await prisma.memberFamilyPermission.findUnique({
    where: {
      groupMemberId_familyId_permission: {
        groupMemberId: member.id,
        familyId,
        permission,
      },
    },
  });
  if (individual) return true;

  // Check via permission group assignments (with family scope)
  const assignments = await prisma.memberPermissionGroupAssignment.findMany({
    where: { groupMemberId: member.id },
    include: {
      permissionGroup: {
        include: { familyPermissions: true },
      },
      familyScopes: true,
    },
  });

  for (const assignment of assignments) {
    const hasPermission = assignment.permissionGroup.familyPermissions.some(
      (e) => e.permission === permission
    );
    if (!hasPermission) continue;

    // Empty scopes = applies to all families
    const scoped = assignment.familyScopes.length > 0;
    if (!scoped) return true;
    if (assignment.familyScopes.some((s) => s.familyId === familyId)) return true;
  }

  return false;
}


// ─── Tree-level permission ────────────────────────────────────────────────────

/**
 * Can the user perform a tree-level action?
 * Handles both solo trees (owner check) and group trees (full permission check).
 */
export async function canDoTreePermission(
  userId: string,
  treeId: string,
  permission: TreePermission
): Promise<boolean> {
  const tree = await prisma.familyTree.findUnique({
    where: { id: treeId },
    select: { ownerId: true, groupId: true, creatorId: true },
  });

  if (!tree) return false;

  // Solo tree: only the owner has any permission
  if (!tree.groupId) {
    return tree.ownerId === userId;
  }

  // Group tree
  const groupId = tree.groupId;

  const member = await prisma.groupMember.findUnique({
    where: { groupId_userId: { groupId, userId } },
    select: { id: true, isAdmin: true, inviteStatus: true },
  });

  if (!member || member.inviteStatus !== InviteStatus.ACCEPTED) return false;

  // Group admin gets everything
  if (member.isAdmin) return true;

  // Creator of this tree gets everything on it
  if (tree.creatorId === userId) return true;

  // Check individual tree permission
  const individual = await prisma.memberTreePermission.findUnique({
    where: {
      groupMemberId_treeId_permission: {
        groupMemberId: member.id,
        treeId,
        permission,
      },
    },
  });
  if (individual) return true;

  // Check via permission group assignments (with tree scope)
  const assignments = await prisma.memberPermissionGroupAssignment.findMany({
    where: { groupMemberId: member.id },
    include: {
      permissionGroup: {
        include: { treePermissions: true },
      },
      treeScopes: true,
    },
  });

  for (const assignment of assignments) {
    const hasPermission = assignment.permissionGroup.treePermissions.some(
      (e) => e.permission === permission
    );
    if (!hasPermission) continue;

    // Empty scopes = applies to all trees
    const scoped = assignment.treeScopes.length > 0;
    if (!scoped) return true;
    if (assignment.treeScopes.some((s) => s.treeId === treeId)) return true;
  }

  return false;
}


// ─── Group admin check ────────────────────────────────────────────────────────

/** Returns true if userId is an accepted admin of the group. */
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