import prisma from '../config/prismaClient';
import { CreateUserData, SingleUserSearchParams } from '../utils/types';

const createUser = async (data: CreateUserData) => {
  return await prisma.user.create({
    data,
  });
};

const getSingleUser = async (
  searchParameter: string | number,
  additionalParams?: SingleUserSearchParams,
) => {
  const query = {
    where: {
      ...(typeof searchParameter !== 'string'
        ? { id: searchParameter }
        : { email: searchParameter }),
    },
    ...(additionalParams
      ? {
          select: {
            ...additionalParams,
          },
        }
      : {}),
  };

  return await prisma.user.findUnique(query);
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
  getSingleUser,
};
