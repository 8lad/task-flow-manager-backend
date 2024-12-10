import { Router } from 'express';
import { ApplicationRoutes } from '../utils/constants';
import userController from '../controllers/user.controller';

const router = Router();

router.post(ApplicationRoutes.Users, userController.createUser);

router.get(ApplicationRoutes.SingleUser, userController.getUser);

export default router;
