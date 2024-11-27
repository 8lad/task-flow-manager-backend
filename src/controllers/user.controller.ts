import { Request, Response, NextFunction } from 'express';
import userRepository from '../repositories/user.repository';
import CustomError from '../services/errorInstance';
import { getSuccessResponseInfoObject } from '../utils/helpers';
import { Prisma } from '@prisma/client';

const getUser = async (
  req: Request<unknown, unknown, { searchParameter: string | number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { searchParameter } = req.body;

    const singleUser = await userRepository.getSingleUser(searchParameter, {
      email: true,
      name: true,
      auth0Id: true,
      id: true,
      projects: true,
      role: true,
      tasks: true,
      isActive: true,
      profile: true,
    });

    if (!singleUser) {
      throw new CustomError("Can't find a user");
    }

    res.status(200).json(singleUser);
  } catch (error) {
    next(error);
  }
};

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

const deleteUser = async (
  req: Request<unknown, unknown, { searchParameter: string | number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { searchParameter } = req.body;

    const existingUser = await userRepository.getSingleUser(searchParameter);

    if (!existingUser) {
      throw new CustomError("User doesn't exist", 404);
    }

    const deletedUser = await userRepository.deleteUser(searchParameter);

    if (!deletedUser) {
      throw new CustomError("Can't delete the current user", 403);
    }

    res.status(200).json(getSuccessResponseInfoObject('The user was deleted'));
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
