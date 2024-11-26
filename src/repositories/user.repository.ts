import prisma from '../config/prismaClient';
import { CreateUserData } from '../utils/types';

const createUser = async (data: CreateUserData) => {
  return await prisma.user.create({
    data,
  });
};

export default {
  createUser,
};
