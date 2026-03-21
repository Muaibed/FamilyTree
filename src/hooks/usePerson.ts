'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { personService } from '@/services/person.service';
import { Person } from '@/generated/prisma';

export const personKeys = {
  detail: (id: string) => ['persons', id] as const,
};

export function usePerson(id: string) {
  return useQuery({
    queryKey: personKeys.detail(id),
    queryFn: () => personService.getPerson(id),
    enabled: !!id,
  });
}

export function useCreatePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Person>) => personService.createPerson(data),
    onSuccess: () => {
      // Invalidate members lists so new person appears
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

export function useUpdatePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Person> }) =>
      personService.updatePerson(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: personKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

export function useDeletePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => personService.deletePerson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['familyTrees'] });
    },
  });
}
