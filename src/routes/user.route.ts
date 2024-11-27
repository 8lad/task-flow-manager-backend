import { Router } from 'express';
import { ApplicationRoutes } from '../utils/constants';
import userController from '../controllers/user.controller';

const router = Router();

router.post(ApplicationRoutes.Register, userController.createUser);

router.get(ApplicationRoutes.Register, userController.getUser);

export default router;
