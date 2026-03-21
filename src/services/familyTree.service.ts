import { FamilyTreeWithDetails } from '@/types/family';

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const familyTreeService = {
  async getOwnerFamilyTrees(): Promise<FamilyTreeWithDetails[]> {
    const res = await fetch(`${BASE}/api/familyTree`);
    if (!res.ok) throw new Error('Failed to fetch family trees');
    return res.json();
  },

  async getFamilyTree(id: string): Promise<FamilyTreeWithDetails> {
    const res = await fetch(`${BASE}/api/familyTree/${id}`);
    if (!res.ok) throw new Error('Failed to fetch family tree');
    return res.json();
  },

  async createFamilyTree(data: {
    name: string;
    description?: string;
    rootPersonId: string;
    groupId?: string;
  }): Promise<FamilyTreeWithDetails> {
    const res = await fetch(`${BASE}/api/familyTree`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create family tree');
    return res.json();
  },

  async updateFamilyTree(
    id: string,
    data: { name?: string; description?: string; rootPersonId?: string; groupId?: string | null }
  ): Promise<FamilyTreeWithDetails> {
    const res = await fetch(`${BASE}/api/familyTree/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update family tree');
    return res.json();
  },

  async deleteFamilyTree(id: string): Promise<void> {
    const res = await fetch(`${BASE}/api/familyTree/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete family tree');
  },

  async addCollapsedBranch(treeId: string, personId: string): Promise<void> {
    const res = await fetch(`${BASE}/api/familyTree/${treeId}/collapsed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personId }),
    });
    if (!res.ok) throw new Error('Failed to collapse branch');
  },

  async removeCollapsedBranch(treeId: string, personId: string): Promise<void> {
    const res = await fetch(`${BASE}/api/familyTree/${treeId}/collapsed/${personId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to expand branch');
  },

  async setPersonColor(
    treeId: string,
    personId: string,
    linkColor: string,
    labelColor: string
  ): Promise<void> {
    const res = await fetch(`${BASE}/api/familyTree/${treeId}/colors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personId, linkColor, labelColor }),
    });
    if (!res.ok) throw new Error('Failed to set person color');
  },

  async clearPersonColor(treeId: string, personId: string): Promise<void> {
    const res = await fetch(`${BASE}/api/familyTree/${treeId}/colors/${personId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to clear person color');
  },
};
