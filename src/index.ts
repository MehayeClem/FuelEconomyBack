import express from 'express';
import routes from './routes';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

const rateLimiter = rateLimit({
	max: 100,
	windowMs: 1000 * 60,
	message: 'Too many request from this IP'
});

const app = express();

app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use('/api/v1', routes);

export default app;
