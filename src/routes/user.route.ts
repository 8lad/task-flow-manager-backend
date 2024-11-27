import { Router } from 'express';
import { ApplicationRoutes } from '../utils/constants';
import userController from '../controllers/user.controller';

const router = Router();

router.post(ApplicationRoutes.Register, userController.createUser);

export default router;
