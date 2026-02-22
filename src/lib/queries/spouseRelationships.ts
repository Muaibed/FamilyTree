import { SpouseRelationship } from "@/generated/prisma"
import { SpouseRelationshipWithPartners } from "@/types/family"

export async function getSpouseRelationships(): Promise<SpouseRelationship[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spouseRelationship`)
  if (!res.ok) throw new Error('Failed to fetch relations')
  return res.json()
}

export async function getSpouseRelationship(id: string): Promise<SpouseRelationship> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spouseRelationship/${id}`)
  if (!res.ok) throw new Error('Failed to fetch relation')
  return res.json()
}

export async function createSpouseRelationship(data: Partial<SpouseRelationship>): Promise<SpouseRelationship> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spouseRelationship`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create relation')
  return res.json()
}

export async function updateSpouseRelationship(id: string, data: SpouseRelationship): Promise<SpouseRelationship> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spouseRelationship/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update relation')
  return res.json()
}

export async function deleteSpouseRelationship(data: Partial<SpouseRelationship>): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spouseRelationship`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to delete relation')
}

export async function getOwnerSpouseRelationships(): Promise<SpouseRelationshipWithPartners[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spouseRelationship/owner`)
  if (!res.ok) throw new Error('Failed to fetch owner relations')
  return res.json()
}