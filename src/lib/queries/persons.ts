import { PersonWithRelations } from "@/types/family"

export async function getPersons(): Promise<PersonWithRelations[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/familyTreeMembers/owner`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function getUser(id: string): Promise<PersonWithRelations> {
  const res = await fetch(`/api/users/${id}`)
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export async function createUser(data: Partial<User>): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create user')
  return res.json()
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update user')
  return res.json()
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete user')
}

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}