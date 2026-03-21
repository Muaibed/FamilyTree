import { prisma } from '../prisma';
import { FamilyPermission, GroupPermission, InviteStatus, TreePermission } from '@/generated/prisma';

// ─── Group CRUD ───────────────────────────────────────────────────────────────

export const createGroup = async (data: { name: string; description?: string; creatorId: string }) => {
  return prisma.group.create({
    data: {
      name: data.name,
      description: data.description,
      creator: { connect: { id: data.creatorId } },
      // Auto-add creator as accepted admin member
      members: {
        create: {
          userId: data.creatorId,
          isAdmin: true,
          inviteStatus: InviteStatus.ACCEPTED,
          joinedAt: new Date(),
        },
      },
    },
  });
};

export const getGroupById = async (id: string) => {
  return prisma.group.findUnique({
    where: { id },
    include: {
      members: {
        include: { user: { select: { id: true, name: true, email: true, subscribtion: true } } },
      },
      families: true,
      familyTrees: true,
      permissionGroups: {
        include: {
          groupPermissions: true,
          familyPermissions: true,
          treePermissions: true
        }
      },
    },
  });
};

export const getGroupsForUser = async (userId: string) => {
  return prisma.group.findMany({
    where: {
      members: { some: { userId, inviteStatus: InviteStatus.ACCEPTED } },
    },
    include: {
      _count: { select: { members: true, families: true } },
    },
  });
};

export const updateGroup = async (id: string, data: { name?: string; description?: string }) => {
  return prisma.group.update({ where: { id }, data });
};

export const deleteGroup = async (id: string) => {
  return prisma.group.delete({ where: { id } });
};


// ─── Invitations ──────────────────────────────────────────────────────────────

export const inviteMemberByEmail = async (groupId: string, email: string) => {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (!user) throw new Error('No user found with that email.');

  // Upsert: if already exists (e.g. rejected), re-invite
  return prisma.groupMember.upsert({
    where: { groupId_userId: { groupId, userId: user.id } },
    create: {
      groupId,
      userId: user.id,
      inviteStatus: InviteStatus.PENDING,
    },
    update: {
      inviteStatus: InviteStatus.PENDING,
      joinedAt: null,
    },
  });
};

export const getPendingInvitesForUser = async (userId: string) => {
  return prisma.groupMember.findMany({
    where: { userId, inviteStatus: InviteStatus.PENDING },
    include: {
      group: { select: { id: true, name: true, description: true, createdAt: true } },
    },
  });
};

export const respondToInvite = async (memberId: string, action: 'ACCEPT' | 'REJECT') => {
  return prisma.groupMember.update({
    where: { id: memberId },
    data: {
      inviteStatus: action === 'ACCEPT' ? InviteStatus.ACCEPTED : InviteStatus.REJECTED,
      ...(action === 'ACCEPT' ? { joinedAt: new Date() } : {}),
    },
  });
};


// ─── Member management ────────────────────────────────────────────────────────

export const removeMember = async (memberId: string) => {
  return prisma.groupMember.delete({ where: { id: memberId } });
};

export const setMemberAdmin = async (memberId: string, isAdmin: boolean) => {
  return prisma.groupMember.update({ where: { id: memberId }, data: { isAdmin } });
};

export const getGroupMembers = async (groupId: string) => {
  return prisma.groupMember.findMany({
    where: { groupId, inviteStatus: InviteStatus.ACCEPTED },
    include: {
      user: { select: { id: true, name: true, email: true, subscribtion: true } },
      groupPermissions: true,
      familyPermissions: true,
      treePermissions: true,
      permissionGroupAssignments: {
        include: {
          permissionGroup: true,
          familyScopes: true,
          treeScopes: true,
        },
      },
    },
  });
};


// ─── Permission Groups (rule-templates) ───────────────────────────────────────

export const createPermissionGroup = async (data: {
  name: string;
  groupId: string;
  groupPermissions?: GroupPermission[];
  familyPermissions?: FamilyPermission[];
  treePermissions?: TreePermission[];
}) => {
  return prisma.permissionGroup.create({
    data: {
      name: data.name,
      group: { connect: { id: data.groupId } },
      groupPermissions: {
        create: (data.groupPermissions ?? []).map((p) => ({ permission: p })),
      },
      familyPermissions: {
        create: (data.familyPermissions ?? []).map((p) => ({ permission: p })),
      },
      treePermissions: {
        create: (data.treePermissions ?? []).map((p) => ({ permission: p })),
      },
    },
    include: { groupPermissions: true, familyPermissions: true, treePermissions: true },
  });
};

export const updatePermissionGroup = async (
  id: string,
  data: {
    name?: string;
    groupPermissions?: GroupPermission[];
    familyPermissions?: FamilyPermission[];
    treePermissions?: TreePermission[];
  }
) => {
  return prisma.$transaction(async (tx) => {
    if (data.name) await tx.permissionGroup.update({ where: { id }, data: { name: data.name } });

    if (data.groupPermissions !== undefined) {
      await tx.permissionGroupGroupEntry.deleteMany({ where: { permissionGroupId: id } });
      await tx.permissionGroupGroupEntry.createMany({
        data: data.groupPermissions.map((p) => ({ permissionGroupId: id, permission: p })),
      });
    }
    if (data.familyPermissions !== undefined) {
      await tx.permissionGroupFamilyEntry.deleteMany({ where: { permissionGroupId: id } });
      await tx.permissionGroupFamilyEntry.createMany({
        data: data.familyPermissions.map((p) => ({ permissionGroupId: id, permission: p })),
      });
    }
    if (data.treePermissions !== undefined) {
      await tx.permissionGroupTreeEntry.deleteMany({ where: { permissionGroupId: id } });
      await tx.permissionGroupTreeEntry.createMany({
        data: data.treePermissions.map((p) => ({ permissionGroupId: id, permission: p })),
      });
    }

    return tx.permissionGroup.findUnique({
      where: { id },
      include: { groupPermissions: true, familyPermissions: true, treePermissions: true },
    });
  });
};

export const deletePermissionGroup = async (id: string) => {
  return prisma.permissionGroup.delete({ where: { id } });
};

export const getPermissionGroupsForGroup = async (groupId: string) => {
  return prisma.permissionGroup.findMany({
    where: { groupId },
    include: { groupPermissions: true, familyPermissions: true, treePermissions: true },
  });
};


// ─── Individual Member Permissions ────────────────────────────────────────────

/** Replaces all group-level permissions for a member. */
export const setMemberGroupPermissions = async (groupMemberId: string, permissions: GroupPermission[]) => {
  return prisma.$transaction([
    prisma.memberGroupPermission.deleteMany({ where: { groupMemberId } }),
    prisma.memberGroupPermission.createMany({
      data: permissions.map((p) => ({ groupMemberId, permission: p })),
    }),
  ]);
};

/** Replaces all family-level permissions for a member on a specific family. */
export const setMemberFamilyPermissions = async (
  groupMemberId: string,
  familyId: string,
  permissions: FamilyPermission[]
) => {
  return prisma.$transaction([
    prisma.memberFamilyPermission.deleteMany({ where: { groupMemberId, familyId } }),
    prisma.memberFamilyPermission.createMany({
      data: permissions.map((p) => ({ groupMemberId, familyId, permission: p })),
    }),
  ]);
};

/** Replaces all tree-level permissions for a member on a specific tree. */
export const setMemberTreePermissions = async (
  groupMemberId: string,
  treeId: string,
  permissions: TreePermission[]
) => {
  return prisma.$transaction([
    prisma.memberTreePermission.deleteMany({ where: { groupMemberId, treeId } }),
    prisma.memberTreePermission.createMany({
      data: permissions.map((p) => ({ groupMemberId, treeId, permission: p })),
    }),
  ]);
};


// ─── Permission Group Assignments ─────────────────────────────────────────────

export const assignPermissionGroup = async (data: {
  groupMemberId: string;
  permissionGroupId: string;
  familyScopes?: string[];
  treeScopes?: string[];
}) => {
  return prisma.memberPermissionGroupAssignment.create({
    data: {
      groupMember: { connect: { id: data.groupMemberId } },
      permissionGroup: { connect: { id: data.permissionGroupId } },
      familyScopes: {
        create: (data.familyScopes ?? []).map((familyId) => ({ familyId })),
      },
      treeScopes: {
        create: (data.treeScopes ?? []).map((treeId) => ({ treeId })),
      },
    },
    include: { familyScopes: true, treeScopes: true },
  });
};

export const removePermissionGroupAssignment = async (assignmentId: string) => {
  return prisma.memberPermissionGroupAssignment.delete({ where: { id: assignmentId } });
};