import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import authToken from '../middlewares/authToken';

const userRouter = Router();

userRouter.put('/:username', authToken, userController.updateUser);
userRouter.delete('/:username', authToken, userController.deleteUser);
userRouter.get('/me', authToken, userController.getUser);

export default userRouter;
