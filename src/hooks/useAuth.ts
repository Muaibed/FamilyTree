'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';

export const authKeys = {
  user: (id: string) => ['user', id] as const,
};

export function useUser(id: string) {
  return useQuery({
    queryKey: authKeys.user(id),
    queryFn: () => authService.getUser(id),
    enabled: !!id,
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      authService.signup(data),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; email?: string } }) =>
      authService.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: authKeys.user(id) });
    },
  });
}
