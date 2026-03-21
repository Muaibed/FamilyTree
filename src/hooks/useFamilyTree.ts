'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { familyTreeService } from '@/services/familyTree.service';

export const familyTreeKeys = {
  all: ['familyTrees'] as const,
  detail: (id: string) => ['familyTrees', id] as const,
};

export function useOwnerFamilyTrees() {
  return useQuery({
    queryKey: familyTreeKeys.all,
    queryFn: () => familyTreeService.getOwnerFamilyTrees(),
  });
}

export function useFamilyTree(id: string) {
  return useQuery({
    queryKey: familyTreeKeys.detail(id),
    queryFn: () => familyTreeService.getFamilyTree(id),
    enabled: !!id,
  });
}

export function useCreateFamilyTree() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; description?: string; rootPersonId: string; groupId?: string }) =>
      familyTreeService.createFamilyTree(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familyTreeKeys.all });
    },
  });
}

export function useUpdateFamilyTree() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; description?: string; rootPersonId?: string };
    }) => familyTreeService.updateFamilyTree(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: familyTreeKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: familyTreeKeys.all });
    },
  });
}

export function useDeleteFamilyTree() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => familyTreeService.deleteFamilyTree(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familyTreeKeys.all });
    },
  });
}

export function useAddCollapsedBranch(treeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (personId: string) => familyTreeService.addCollapsedBranch(treeId, personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familyTreeKeys.detail(treeId) });
    },
  });
}

export function useRemoveCollapsedBranch(treeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (personId: string) => familyTreeService.removeCollapsedBranch(treeId, personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familyTreeKeys.detail(treeId) });
    },
  });
}

export function useSetPersonColor(treeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      personId,
      linkColor,
      labelColor,
    }: {
      personId: string;
      linkColor: string;
      labelColor: string;
    }) => familyTreeService.setPersonColor(treeId, personId, linkColor, labelColor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familyTreeKeys.detail(treeId) });
    },
  });
}

export function useClearPersonColor(treeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (personId: string) => familyTreeService.clearPersonColor(treeId, personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familyTreeKeys.detail(treeId) });
    },
  });
}
