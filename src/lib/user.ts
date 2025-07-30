import { prisma } from './prisma';

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getAdminNumber = async () => {
  const admin = await prisma.user.findFirst({
    where: { 
      role: "ADMIN"
    }
  });
  return admin?.phone
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};


export const updateUser = async (id: string, data: {
  email?: string;
  phone?: string;
  name?: string;
}) => {
  const { email, phone, name } = data;
  
  return prisma.user.update({
    where: { id },
    data: {
      email,
      phone,
      name,
    },
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
