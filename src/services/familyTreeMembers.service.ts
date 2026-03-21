import { PersonWithRelations } from '@/types/family';

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const familyTreeMembersService = {
  async getMembers(): Promise<PersonWithRelations[]> {
    const res = await fetch(`${BASE}/api/familyTreeMembers`);
    if (!res.ok) throw new Error('Failed to fetch members');
    return res.json();
  },

  async getOwnerMembers(): Promise<PersonWithRelations[]> {
    const res = await fetch(`${BASE}/api/familyTreeMembers/owner`);
    if (!res.ok) throw new Error('Failed to fetch owner members');
    return res.json();
  },

  async getFamilyMembers(familyId: string): Promise<PersonWithRelations[]> {
    const res = await fetch(`${BASE}/api/familyTreeMembers/${familyId}`);
    if (!res.ok) throw new Error('Failed to fetch family members');
    return res.json();
  },
};
