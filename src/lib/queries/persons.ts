// Re-exported from services for backward compatibility.
// Prefer importing from @/services/person.service or @/hooks/usePerson.
import { personService } from '@/services/person.service';
import { Person } from '@/generated/prisma';

export const getPerson = (id: string) => personService.getPerson(id);
export const createPerson = (data: Partial<Person>) => personService.createPerson(data);
export const updatePerson = (id: string, data: Partial<Person>) => personService.updatePerson(id, data);
export const deletePerson = (id: string) => personService.deletePerson(id);
