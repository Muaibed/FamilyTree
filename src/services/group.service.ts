import { FamilyPermission, GroupPermission, TreePermission } from '@/generated/prisma';

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const groupService = {
  // ─── Groups ───────────────────────────────────────────────────────────────

  async getGroups(permission?: string) {
    const url = permission ? `${BASE}/api/group?permission=${permission}` : `${BASE}/api/group`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch groups');
    return res.json();
  },

  async getGroup(id: string) {
    const res = await fetch(`${BASE}/api/group/${id}`);
    if (!res.ok) throw new Error('Failed to fetch group');
    return res.json();
  },

  async createGroup(data: { name: string; description?: string }) {
    const res = await fetch(`${BASE}/api/group`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create group');
    return res.json();
  },

  async updateGroup(id: string, data: { name?: string; description?: string }) {
    const res = await fetch(`${BASE}/api/group/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update group');
    return res.json();
  },

  async deleteGroup(id: string): Promise<void> {
    const res = await fetch(`${BASE}/api/group/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete group');
  },

  // ─── Invitations ─────────────────────────────────────────────────────────

  async getPendingInvites() {
    const res = await fetch(`${BASE}/api/group/invites`);
    if (!res.ok) throw new Error('Failed to fetch invites');
    return res.json();
  },

  async inviteMember(groupId: string, email: string) {
    const res = await fetch(`${BASE}/api/group/${groupId}/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error('Failed to send invite');
    return res.json();
  },

  async respondToInvite(groupId: string, memberId: string, action: 'ACCEPT' | 'REJECT') {
    const res = await fetch(`${BASE}/api/group/${groupId}/invite/${memberId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    if (!res.ok) throw new Error('Failed to respond to invite');
    return res.json();
  },

  // ─── Members ─────────────────────────────────────────────────────────────

  async getGroupMembers(groupId: string) {
    const res = await fetch(`${BASE}/api/group/${groupId}/members`);
    if (!res.ok) throw new Error('Failed to fetch members');
    return res.json();
  },

  async setMemberAdmin(groupId: string, memberId: string, isAdmin: boolean) {
    const res = await fetch(`${BASE}/api/group/${groupId}/members/${memberId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAdmin }),
    });
    if (!res.ok) throw new Error('Failed to update member');
    return res.json();
  },

  async removeMember(groupId: string, memberId: string): Promise<void> {
    const res = await fetch(`${BASE}/api/group/${groupId}/members/${memberId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to remove member');
  },

  // ─── Permission Groups (rule-templates) ──────────────────────────────────

  async getPermissionGroups(groupId: string) {
    const res = await fetch(`${BASE}/api/group/${groupId}/permissionGroups`);
    if (!res.ok) throw new Error('Failed to fetch permission groups');
    return res.json();
  },

  async createPermissionGroup(
    groupId: string,
    data: {
      name: string;
      groupPermissions?: GroupPermission[];
      familyPermissions?: FamilyPermission[];
      treePermissions?: TreePermission[];
    }
  ) {
    const res = await fetch(`${BASE}/api/group/${groupId}/permissionGroups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create permission group');
    return res.json();
  },

  async updatePermissionGroup(
    groupId: string,
    pgId: string,
    data: {
      name?: string;
      groupPermissions?: GroupPermission[];
      familyPermissions?: FamilyPermission[];
      treePermissions?: TreePermission[];
    }
  ) {
    const res = await fetch(`${BASE}/api/group/${groupId}/permissionGroups/${pgId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update permission group');
    return res.json();
  },

  async deletePermissionGroup(groupId: string, pgId: string): Promise<void> {
    const res = await fetch(`${BASE}/api/group/${groupId}/permissionGroups/${pgId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete permission group');
  },

  // ─── Individual Permissions ───────────────────────────────────────────────

  async setMemberGroupPermissions(
    groupId: string,
    memberId: string,
    permissions: GroupPermission[]
  ) {
    const res = await fetch(`${BASE}/api/group/${groupId}/members/${memberId}/groupPermissions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissions }),
    });
    if (!res.ok) throw new Error('Failed to set group permissions');
  },

  async setMemberFamilyPermissions(
    groupId: string,
    memberId: string,
    familyId: string,
    permissions: FamilyPermission[]
  ) {
    const res = await fetch(
      `${BASE}/api/group/${groupId}/members/${memberId}/families/${familyId}/permissions`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissions }),
      }
    );
    if (!res.ok) throw new Error('Failed to set family permissions');
  },

  async setMemberTreePermissions(
    groupId: string,
    memberId: string,
    treeId: string,
    permissions: TreePermission[]
  ) {
    const res = await fetch(
      `${BASE}/api/group/${groupId}/members/${memberId}/trees/${treeId}/permissions`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissions }),
      }
    );
    if (!res.ok) throw new Error('Failed to set tree permissions');
  },

  // ─── Permission Group Assignments ─────────────────────────────────────────

  async assignPermissionGroup(
    groupId: string,
    memberId: string,
    data: {
      permissionGroupId: string;
      familyScopes?: string[];
      treeScopes?: string[];
    }
  ) {
    const res = await fetch(`${BASE}/api/group/${groupId}/members/${memberId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to assign permission group');
    return res.json();
  },

  async removePermissionGroupAssignment(
    groupId: string,
    memberId: string,
    assignmentId: string
  ): Promise<void> {
    const res = await fetch(`${BASE}/api/group/${groupId}/members/${memberId}/assign`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignmentId }),
    });
    if (!res.ok) throw new Error('Failed to remove permission group assignment');
  },
};
