'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { spouseRelationshipService } from '@/services/spouseRelationship.service';
import { SpouseRelationship } from '@/generated/prisma';

export const spouseRelationshipKeys = {
  all: ['spouseRelationships'] as const,
  owner: ['spouseRelationships', 'owner'] as const,
  detail: (id: string) => ['spouseRelationships', id] as const,
};

export function useSpouseRelationships() {
  return useQuery({
    queryKey: spouseRelationshipKeys.all,
    queryFn: () => spouseRelationshipService.getSpouseRelationships(),
  });
}

export function useOwnerSpouseRelationships() {
  return useQuery({
    queryKey: spouseRelationshipKeys.owner,
    queryFn: () => spouseRelationshipService.getOwnerSpouseRelationships(),
  });
}

export function useSpouseRelationship(id: string) {
  return useQuery({
    queryKey: spouseRelationshipKeys.detail(id),
    queryFn: () => spouseRelationshipService.getSpouseRelationship(id),
    enabled: !!id,
  });
}

export function useCreateSpouseRelationship() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SpouseRelationship>) =>
      spouseRelationshipService.createSpouseRelationship(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spouseRelationshipKeys.all });
    },
  });
}

export function useUpdateSpouseRelationship() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SpouseRelationship> }) =>
      spouseRelationshipService.updateSpouseRelationship(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: spouseRelationshipKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: spouseRelationshipKeys.all });
    },
  });
}

export function useDeleteSpouseRelationship() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SpouseRelationship>) =>
      spouseRelationshipService.deleteSpouseRelationship(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spouseRelationshipKeys.all });
    },
  });
}

export function useDeleteSpouseRelationshipById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => spouseRelationshipService.deleteSpouseRelationshipById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spouseRelationshipKeys.all });
    },
  });
}
