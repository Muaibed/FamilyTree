'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupService } from '@/services/group.service';
import { FamilyPermission, GroupPermission, TreePermission } from '@/generated/prisma';

export const groupKeys = {
  all: ['groups'] as const,
  detail: (id: string) => ['groups', id] as const,
  members: (groupId: string) => ['groups', groupId, 'members'] as const,
  invites: ['group-invites'] as const,
  permissionGroups: (groupId: string) => ['groups', groupId, 'permissionGroups'] as const,
  activityLog: (groupId: string) => ['groups', groupId, 'activity'] as const,
};

// ─── Group Queries ────────────────────────────────────────────────────────────

export function useGroups(permission?: string) {
  return useQuery({
    queryKey: permission ? [...groupKeys.all, permission] : groupKeys.all,
    queryFn: () => groupService.getGroups(permission),
  });
}

export function useGroup(id: string) {
  return useQuery({
    queryKey: groupKeys.detail(id),
    queryFn: () => groupService.getGroup(id),
    enabled: !!id,
  });
}

export function useGroupMembers(groupId: string) {
  return useQuery({
    queryKey: groupKeys.members(groupId),
    queryFn: () => groupService.getGroupMembers(groupId),
    enabled: !!groupId,
  });
}

export function useGroupInvites() {
  return useQuery({
    queryKey: groupKeys.invites,
    queryFn: () => groupService.getPendingInvites(),
  });
}

export function usePermissionGroups(groupId: string, isAdmin = false) {
  return useQuery({
    queryKey: groupKeys.permissionGroups(groupId),
    queryFn: () => groupService.getPermissionGroups(groupId),
    enabled: !!groupId && isAdmin,
  });
}

export function useActivityLog(groupId: string, isAdmin = false) {
  return useQuery({
    queryKey: groupKeys.activityLog(groupId),
    queryFn: async () => {
      const res = await fetch(`/api/group/${groupId}/activity`);
      if (!res.ok) throw new Error('Failed to fetch activity log');
      return res.json() as Promise<{
        id: string;
        action: string;
        entityType: string;
        entityName: string | null;
        userName: string | null;
        createdAt: string;
      }[]>;
    },
    enabled: !!groupId && isAdmin,
  });
}

// ─── Group Mutations ──────────────────────────────────────────────────────────

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; description?: string }) => groupService.createGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}

export function useUpdateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; description?: string } }) =>
      groupService.updateGroup(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: groupKeys.detail(id) });
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => groupService.deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}

// ─── Invite Mutations ─────────────────────────────────────────────────────────

export function useInviteMember(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => groupService.inviteMember(groupId, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(groupId) });
    },
  });
}

export function useRespondToInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      groupId,
      memberId,
      action,
    }: {
      groupId: string;
      memberId: string;
      action: 'ACCEPT' | 'REJECT';
    }) => groupService.respondToInvite(groupId, memberId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.invites });
      queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}

// ─── Member Mutations ─────────────────────────────────────────────────────────

export function useSetMemberAdmin(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, isAdmin }: { memberId: string; isAdmin: boolean }) =>
      groupService.setMemberAdmin(groupId, memberId, isAdmin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(groupId) });
    },
  });
}

export function useRemoveMember(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => groupService.removeMember(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(groupId) });
      queryClient.invalidateQueries({ queryKey: groupKeys.detail(groupId) });
    },
  });
}

// ─── Permission Group Mutations ───────────────────────────────────────────────

export function useCreatePermissionGroup(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      groupPermissions?: GroupPermission[];
      familyPermissions?: FamilyPermission[];
      treePermissions?: TreePermission[];
    }) => groupService.createPermissionGroup(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.permissionGroups(groupId) });
    },
  });
}

export function useUpdatePermissionGroup(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      pgId,
      data,
    }: {
      pgId: string;
      data: {
        name?: string;
        groupPermissions?: GroupPermission[];
        familyPermissions?: FamilyPermission[];
        treePermissions?: TreePermission[];
      };
    }) => groupService.updatePermissionGroup(groupId, pgId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.permissionGroups(groupId) });
      queryClient.invalidateQueries({ queryKey: groupKeys.detail(groupId) });
    },
  });
}

export function useDeletePermissionGroup(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pgId: string) => groupService.deletePermissionGroup(groupId, pgId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.permissionGroups(groupId) });
    },
  });
}

// ─── Permission Mutations ─────────────────────────────────────────────────────

export function useSetMemberGroupPermissions(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, permissions }: { memberId: string; permissions: GroupPermission[] }) =>
      groupService.setMemberGroupPermissions(groupId, memberId, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(groupId) });
    },
  });
}

export function useSetMemberFamilyPermissions(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      memberId,
      familyId,
      permissions,
    }: {
      memberId: string;
      familyId: string;
      permissions: FamilyPermission[];
    }) => groupService.setMemberFamilyPermissions(groupId, memberId, familyId, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(groupId) });
    },
  });
}

export function useSetMemberTreePermissions(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      memberId,
      treeId,
      permissions,
    }: {
      memberId: string;
      treeId: string;
      permissions: TreePermission[];
    }) => groupService.setMemberTreePermissions(groupId, memberId, treeId, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(groupId) });
    },
  });
}

export function useAssignPermissionGroup(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      memberId: string;
      permissionGroupId: string;
      familyScopes?: string[];
      treeScopes?: string[];
    }) =>
      groupService.assignPermissionGroup(groupId, data.memberId, {
        permissionGroupId: data.permissionGroupId,
        familyScopes: data.familyScopes,
        treeScopes: data.treeScopes,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(groupId) });
    },
  });
}

export function useRemovePermissionGroupAssignment(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, assignmentId }: { memberId: string; assignmentId: string }) =>
      groupService.removePermissionGroupAssignment(groupId, memberId, assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.members(groupId) });
    },
  });
}
