import { Router } from 'express';
import UserController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/signup', UserController.createUser);

export default userRouter;
