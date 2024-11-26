import prisma from '../config/prismaClient';
import { CreateUserData } from '../utils/types';

const createUser = async (data: CreateUserData) => {
  return await prisma.user.create({
    data,
  });
};

const deleteUser = async (useId: number) => {
  return await prisma.user.update({
    where: {
      id: useId,
    },
    data: {
      isActive: false,
    },
  });
};

export default {
  createUser,
  deleteUser,
};
