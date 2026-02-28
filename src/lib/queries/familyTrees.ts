import { FamilyTreeWithDetails } from '@/types/family';

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export async function getOwnerFamilyTrees(): Promise<FamilyTreeWithDetails[]> {
  const res = await fetch(`${BASE}/api/familyTree`);
  if (!res.ok) throw new Error('Failed to fetch family trees');
  return res.json();
}

export async function getFamilyTree(id: string): Promise<FamilyTreeWithDetails> {
  const res = await fetch(`${BASE}/api/familyTree/${id}`);
  if (!res.ok) throw new Error('Failed to fetch family tree');
  return res.json();
}

export async function createFamilyTree(data: {
  name: string;
  description?: string;
  rootPersonId: string;
}): Promise<FamilyTreeWithDetails> {
  const res = await fetch(`${BASE}/api/familyTree`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create family tree');
  return res.json();
}

export async function updateFamilyTree(id: string, data: {
  name?: string;
  description?: string;
  rootPersonId?: string;
}): Promise<FamilyTreeWithDetails> {
  const res = await fetch(`${BASE}/api/familyTree/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update family tree');
  return res.json();
}

export async function deleteFamilyTree(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/familyTree/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete family tree');
}

export async function addCollapsedBranch(treeId: string, personId: string): Promise<void> {
  const res = await fetch(`${BASE}/api/familyTree/${treeId}/collapsed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ personId }),
  });
  if (!res.ok) throw new Error('Failed to collapse branch');
}

export async function removeCollapsedBranch(treeId: string, personId: string): Promise<void> {
  const res = await fetch(`${BASE}/api/familyTree/${treeId}/collapsed/${personId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to expand branch');
}