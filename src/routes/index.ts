import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import authToken from '../middlewares/authToken';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', authToken, userRouter);

export default router;
