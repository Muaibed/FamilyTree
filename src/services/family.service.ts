import { Family } from '@/generated/prisma';
import { FamilyWithRootPerson } from '@/types/family';

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const familyService = {
  async getFamilies(): Promise<FamilyWithRootPerson[]> {
    const res = await fetch(`${BASE}/api/family/`);
    if (!res.ok) throw new Error('Failed to fetch families');
    return res.json();
  },

  async getFamily(id: string): Promise<FamilyWithRootPerson> {
    const res = await fetch(`${BASE}/api/family/${id}`);
    if (!res.ok) throw new Error('Failed to fetch family');
    return res.json();
  },

  async getOwnerFamilies(): Promise<FamilyWithRootPerson[]> {
    const res = await fetch(`${BASE}/api/family/owner`);
    if (!res.ok) throw new Error('Failed to fetch owner families');
    return res.json();
  },

  async createFamily(data: { name: string; groupId?: string }): Promise<FamilyWithRootPerson> {
    const res = await fetch(`${BASE}/api/family`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create family');
    return res.json();
  },

  async updateFamily(id: string, data: Partial<Family> & { groupId?: string | null }): Promise<Family> {
    const res = await fetch(`${BASE}/api/family/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update family');
    return res.json();
  },

  async deleteFamily(id: string): Promise<void> {
    const res = await fetch(`${BASE}/api/family/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete family');
  },
};
