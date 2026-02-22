import { PersonWithRelations } from "@/types/family";

export async function getMembers(): Promise<PersonWithRelations[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers`)
  if (!res.ok) throw new Error('Failed to fetch members')
  return res.json()
}

export async function getOwnerMembers(): Promise<PersonWithRelations[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/owner`)
  if (!res.ok) throw new Error('Failed to fetch owner members')
  return res.json()
}

export async function getFamilyMembers(familyId: string): Promise<PersonWithRelations[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/${familyId}`)
  if (!res.ok) throw new Error('Failed to fetch family members')
  return res.json()
}
