import { Router } from 'express';
import auth from '../middleware/auth';
import UserController from '../controllers/userController';
import { schema, validate } from '../middleware/schemaValidators';
import upload from '../middleware/uploader';

const userRouter = Router();

// Route calling the required class methods in the User Controller class
userRouter.post('/signup', upload.single('passportURL'), validate(schema.userSchema), UserController.createUser);
userRouter.post('/login', validate(schema.loginSchema), UserController.loginUser);
userRouter.get('/users', auth.verifyToken, UserController.getUsers);

export default userRouter;
