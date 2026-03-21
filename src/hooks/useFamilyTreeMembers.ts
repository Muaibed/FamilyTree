'use client';

import { useQuery } from '@tanstack/react-query';
import { familyTreeMembersService } from '@/services/familyTreeMembers.service';

export const membersKeys = {
  all: ['members'] as const,
  owner: ['members', 'owner'] as const,
  family: (familyId: string) => ['members', 'family', familyId] as const,
};

export function useMembers() {
  return useQuery({
    queryKey: membersKeys.all,
    queryFn: () => familyTreeMembersService.getMembers(),
  });
}

export function useOwnerMembers() {
  return useQuery({
    queryKey: membersKeys.owner,
    queryFn: () => familyTreeMembersService.getOwnerMembers(),
  });
}

export function useFamilyMembers(familyId: string) {
  return useQuery({
    queryKey: membersKeys.family(familyId),
    queryFn: () => familyTreeMembersService.getFamilyMembers(familyId),
    enabled: !!familyId,
  });
}
