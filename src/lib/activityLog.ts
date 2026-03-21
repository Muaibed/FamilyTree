import { prisma } from './prisma';
import { ActivityAction, ActivityEntityType } from '@/generated/prisma';

export async function logActivity({
  groupId,
  userId,
  userName,
  action,
  entityType,
  entityId,
  entityName,
}: {
  groupId: string;
  userId: string;
  userName?: string | null;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId?: string;
  entityName?: string | null;
}) {
  try {
    await prisma.activityLog.create({
      data: { groupId, userId, userName, action, entityType, entityId, entityName },
    });
  } catch {
    // Log errors should never crash the main operation
  }
}
