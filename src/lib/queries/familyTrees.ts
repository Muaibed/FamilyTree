// Re-exported from services for backward compatibility.
// Prefer importing from @/services/familyTree.service or @/hooks/useFamilyTree.
import { familyTreeService } from '@/services/familyTree.service';

export const getOwnerFamilyTrees = () => familyTreeService.getOwnerFamilyTrees();
export const getFamilyTree = (id: string) => familyTreeService.getFamilyTree(id);
export const createFamilyTree = (data: { name: string; description?: string; rootPersonId: string; groupId?: string }) =>
  familyTreeService.createFamilyTree(data);
export const updateFamilyTree = (id: string, data: { name?: string; description?: string; rootPersonId?: string; groupId?: string | null }) =>
  familyTreeService.updateFamilyTree(id, data);
export const deleteFamilyTree = (id: string) => familyTreeService.deleteFamilyTree(id);
export const addCollapsedBranch = (treeId: string, personId: string) =>
  familyTreeService.addCollapsedBranch(treeId, personId);
export const removeCollapsedBranch = (treeId: string, personId: string) =>
  familyTreeService.removeCollapsedBranch(treeId, personId);
export const setPersonColor = (treeId: string, personId: string, linkColor: string, labelColor: string) =>
  familyTreeService.setPersonColor(treeId, personId, linkColor, labelColor);
export const clearPersonColor = (treeId: string, personId: string) =>
  familyTreeService.clearPersonColor(treeId, personId);
