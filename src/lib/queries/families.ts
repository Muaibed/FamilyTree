// Re-exported from services for backward compatibility.
// Prefer importing from @/services/family.service or @/hooks/useFamily.
import { familyService } from '@/services/family.service';
import { Family } from '@/generated/prisma';

export const getFamilies = () => familyService.getFamilies();
export const getFamily = (id: string) => familyService.getFamily(id);
export const getOwnerFamilies = () => familyService.getOwnerFamilies();
export const createFamily = (data: { name: string; groupId?: string }) => familyService.createFamily(data);
export const updateFamily = (id: string, data: Partial<Family>) => familyService.updateFamily(id, data);
export const deleteFamily = (id: string) => familyService.deleteFamily(id);
