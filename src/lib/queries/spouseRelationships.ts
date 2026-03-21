// Re-exported from services for backward compatibility.
// Prefer importing from @/services/spouseRelationship.service or @/hooks/useSpouseRelationship.
import { spouseRelationshipService } from '@/services/spouseRelationship.service';
import { SpouseRelationship } from '@/generated/prisma';

export const getSpouseRelationships = () => spouseRelationshipService.getSpouseRelationships();
export const getSpouseRelationship = (id: string) => spouseRelationshipService.getSpouseRelationship(id);
export const getOwnerSpouseRelationships = () => spouseRelationshipService.getOwnerSpouseRelationships();
export const createSpouseRelationship = (data: Partial<SpouseRelationship>) =>
  spouseRelationshipService.createSpouseRelationship(data);
export const updateSpouseRelationship = (id: string, data: Partial<SpouseRelationship>) =>
  spouseRelationshipService.updateSpouseRelationship(id, data);
export const deleteSpouseRelationship = (data: Partial<SpouseRelationship>) =>
  spouseRelationshipService.deleteSpouseRelationship(data);
