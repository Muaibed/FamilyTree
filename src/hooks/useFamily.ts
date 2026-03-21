'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { familyService } from '@/services/family.service';
import { Family } from '@/generated/prisma';

export const familyKeys = {
  all: ['families'] as const,
  detail: (id: string) => ['families', id] as const,
  owner: ['families', 'owner'] as const,
};

export function useFamilies() {
  return useQuery({
    queryKey: familyKeys.all,
    queryFn: () => familyService.getFamilies(),
  });
}

export function useOwnerFamilies() {
  return useQuery({
    queryKey: familyKeys.owner,
    queryFn: () => familyService.getOwnerFamilies(),
  });
}

export function useFamily(id: string) {
  return useQuery({
    queryKey: familyKeys.detail(id),
    queryFn: () => familyService.getFamily(id),
    enabled: !!id,
  });
}

export function useCreateFamily() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; groupId?: string }) => familyService.createFamily(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familyKeys.all });
    },
  });
}

export function useUpdateFamily() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Family> }) =>
      familyService.updateFamily(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: familyKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: familyKeys.all });
    },
  });
}

export function useDeleteFamily() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => familyService.deleteFamily(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: familyKeys.all });
    },
  });
}
