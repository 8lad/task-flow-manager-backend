import { Request, Response, NextFunction } from 'express';
import userRepository from '../repositories/user.repository';
import CustomError from '../services/errorInstance';
import { getSuccessResponseInfoObject } from '../utils/helpers';
import { Prisma } from '@prisma/client';

const createUser = async (
  req: Request<unknown, unknown, Prisma.UserCreateInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, auth0Id, email } = req.body;

    const existingUser = await userRepository.getSingleUser(email);

    if (existingUser && !existingUser.isActive) {
      throw new CustomError('This account was deleted', 400);
    }

    if (existingUser) {
      throw new CustomError('The account is already created', 400);
    }

    const newUser = await userRepository.createUser({ email, auth0Id, name });

    if (!newUser) {
      throw new CustomError('Cannot create a new user. Try again later', 403);
    }

    res.status(201).json(getSuccessResponseInfoObject('The user was created'));
  } catch (error) {
    next(error);
  }
};

const updateUser = async (
  req: Request<unknown, unknown, Prisma.UserUpdateInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, ...rest } = req.body;

    const existingUser = await userRepository.getSingleUser(email as string);

    if (!existingUser) {
      throw new CustomError("User doesn't exist", 404);
    }

    const updatedUser = await userRepository.updateSingleUser(email as string, {
      email,
      ...rest,
    });

    if (!updatedUser) {
      throw new CustomError('Cann not update a user data', 403);
    }

    res.status(200).json(getSuccessResponseInfoObject('User was updated'));
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  updateUser,
};
