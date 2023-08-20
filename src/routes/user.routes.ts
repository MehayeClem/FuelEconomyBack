import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.put('/user', userController.updateUser);
userRouter.delete('/user', userController.deleteUser);

export default userRouter;
