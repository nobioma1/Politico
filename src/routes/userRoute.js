import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

// Route calling the required class methods in the User Controller class
userRouter.post('/signup', UserController.createUser);
userRouter.post('/login', UserController.loginUser);

export default userRouter;
