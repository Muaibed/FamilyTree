import { Family, Person } from "@/generated/prisma"
import { FamilyWithRootPerson, PersonWithRelations } from "@/types/family"

export async function getFamilies(): Promise<FamilyWithRootPerson[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/`)
    if (!res.ok) throw new Error('Failed to fetch families')
    return res.json()
}

export async function getDisplayedFamilies(): Promise<FamilyWithRootPerson[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/isDisplayed`)
  if (!res.ok) throw new Error('Failed to fetch families')
  return res.json()
}

export async function getFamily(id: string): Promise<FamilyWithRootPerson> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${id}`)
  if (!res.ok) throw new Error('Failed to fetch family')
  return res.json()
}

export async function createFamily(data: Family): Promise<FamilyWithRootPerson> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create family')
  return res.json()
}

export async function updateFamily(id: string, data: Family): Promise<Family> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update family')
  return res.json()
}

export async function deleteFamily(id: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete family')
}

export async function getOwnerFamilies(): Promise<FamilyWithRootPerson[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/owner`)
  if (!res.ok) throw new Error('Failed to fetch owner families')
  return res.json()
}

export async function getRelatedFamilies(familyId: string): Promise<FamilyWithRootPerson[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/relatedFamilies/${familyId}`)
  if (!res.ok) throw new Error('Failed to fetch related families')
  return res.json()
}