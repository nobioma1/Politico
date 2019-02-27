import { Router } from 'express';
import auth from '../middleware/auth';
import UserController from '../controllers/userController';

const userRouter = Router();

// Route calling the required class methods in the User Controller class
userRouter.post('/signup', UserController.createUser);
userRouter.post('/login', UserController.loginUser);
userRouter.get('/users', auth.verifyToken, UserController.getUsers);

export default userRouter;
