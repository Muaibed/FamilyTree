// Re-exported from services for backward compatibility.
// Prefer importing from @/services/familyTreeMembers.service or @/hooks/useFamilyTreeMembers.
import { familyTreeMembersService } from '@/services/familyTreeMembers.service';

export const getMembers = () => familyTreeMembersService.getMembers();
export const getOwnerMembers = () => familyTreeMembersService.getOwnerMembers();
export const getFamilyMembers = (familyId: string) => familyTreeMembersService.getFamilyMembers(familyId);
