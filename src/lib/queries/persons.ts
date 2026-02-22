import { Person } from "@/generated/prisma"
import { PersonWithRelations } from "@/types/family"

export async function getPerson(id: string): Promise<PersonWithRelations> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/person/${id}`)
  if (!res.ok) throw new Error('Failed to fetch person')
    return res.json()
}

export async function createPerson(data: Partial<Person>): Promise<PersonWithRelations> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/person`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create person')
    return res.json()
}

export async function updatePerson(id: string, data: Partial<Person>): Promise<Person> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/person/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Failed to update person')
    return res.json()
}

export async function deletePerson(id: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/person/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete person')
}