import { ChangeRequestStatus, ChangeRequestTargetModel, Prisma } from '@/generated/prisma';
import { prisma } from './prisma';

export const createAddRequest = async (data: {
  targetModel: ChangeRequestTargetModel
  dataJSON: Prisma.JsonObject,
  requesterName: string,
  requesterPhone: string,
  requesterId?: string,
}) => {
  const { targetModel, dataJSON, requesterName, requesterPhone, requesterId } = data;
  return prisma.changeRequest.create({
    data: {
        action: "ADD",
        targetModel,
        data: dataJSON,
        requesterName,
        requesterPhone,
        requesterId,
    }
  });
};

export const createUpdateRequest = async (data: {
  targetModel: ChangeRequestTargetModel
  targetId?: string,
  dataJSON: Prisma.JsonObject,
  requesterName: string,
  requesterPhone: string,
  requesterId?: string,
}) => {
  const { targetModel, targetId, dataJSON, requesterName, requesterPhone, requesterId } = data;
  return prisma.changeRequest.create({
    data: {
        action: "UPDATE",
        targetModel,
        targetId,
        data: dataJSON,
        requesterName,
        requesterPhone,
        requesterId,
    }
  });
};

export const createDeleteRequest = async (data: {
  targetModel: ChangeRequestTargetModel
  targetId?: string,
  requesterName: string,
  requesterPhone: string,
  requesterId?: string,
}) => {
  const { targetModel, targetId, requesterName, requesterPhone, requesterId } = data;
  return prisma.changeRequest.create({
    data: {
        action: "DELETE",
        targetModel,
        targetId,
        requesterName,
        requesterPhone,
        requesterId,
    }
  });
};


export const getChangeRequestById = async (id: number) => {
  return prisma.changeRequest.findUnique({
    where: { id },
  });
};

export const getAllChangeRequests = async () => {
  return prisma.changeRequest.findMany();
};

export const updateChangeRequest = async (id: number, status: ChangeRequestStatus) => {
  return prisma.changeRequest.update({
    where: { id },
    data: {
      status
    },
  });
};

export const deleteChangeRequest = async (id: number) => {
  return prisma.changeRequest.delete({
    where: { id },
  });
};