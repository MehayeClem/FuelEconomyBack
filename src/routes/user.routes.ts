import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/me', userController.getUser);
userRouter.put('/:id/gasStations', userController.addGasStation);
userRouter.delete('/:id/gasStations', userController.deleteGasStation);

export default userRouter;
