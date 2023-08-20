import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).send('No token provide');
	}

	jwt.verify(token, process.env.ACCESS_TOKEN as string, (error, userId) => {
		if (error) {
			return res.status(401).send('Unauthorized');
		}

		req.body.userId = userId;
		next();
	});
}

export default authToken;
