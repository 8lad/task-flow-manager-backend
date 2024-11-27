import prisma from '../config/prismaClient';
import { Prisma } from '@prisma/client';
import { SingleUserSearchParams } from '../utils/types';
import { getPrismaUserSearchParameter } from '../utils/helpers';

const createUser = async (data: Prisma.UserCreateInput) => {
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
      ...getPrismaUserSearchParameter(searchParameter),
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

const deleteUser = async (searchParameter: number | string) => {
  return await prisma.user.update({
    where: {
      ...getPrismaUserSearchParameter(searchParameter),
    },
    data: {
      isActive: false,
    },
  });
};

const updateSingleUser = async (searchParameter: string | number, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: {
      ...getPrismaUserSearchParameter(searchParameter),
    },
    data: {
      ...data,
    },
  });
};

export default {
  createUser,
  deleteUser,
  getSingleUser,
  updateSingleUser,
};
