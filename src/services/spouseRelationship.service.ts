import { SpouseRelationship } from '@/generated/prisma';
import { SpouseRelationshipWithPartners } from '@/types/family';

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const spouseRelationshipService = {
  async getSpouseRelationships(): Promise<SpouseRelationship[]> {
    const res = await fetch(`${BASE}/api/spouseRelationship`);
    if (!res.ok) throw new Error('Failed to fetch relations');
    return res.json();
  },

  async getSpouseRelationship(id: string): Promise<SpouseRelationship> {
    const res = await fetch(`${BASE}/api/spouseRelationship/${id}`);
    if (!res.ok) throw new Error('Failed to fetch relation');
    return res.json();
  },

  async getOwnerSpouseRelationships(): Promise<SpouseRelationshipWithPartners[]> {
    const res = await fetch(`${BASE}/api/spouseRelationship/owner`);
    if (!res.ok) throw new Error('Failed to fetch owner relations');
    return res.json();
  },

  async createSpouseRelationship(data: Partial<SpouseRelationship>): Promise<SpouseRelationship> {
    const res = await fetch(`${BASE}/api/spouseRelationship`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create relation');
    return res.json();
  },

  async updateSpouseRelationship(
    id: string,
    data: Partial<SpouseRelationship>
  ): Promise<SpouseRelationship> {
    const res = await fetch(`${BASE}/api/spouseRelationship/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update relation');
    return res.json();
  },

  async deleteSpouseRelationship(data: Partial<SpouseRelationship>): Promise<void> {
    const res = await fetch(`${BASE}/api/spouseRelationship`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to delete relation');
  },

  async deleteSpouseRelationshipById(id: string): Promise<void> {
    const res = await fetch(`${BASE}/api/spouseRelationship/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete relation');
  },
};
