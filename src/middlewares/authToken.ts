import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).send('Pas de token fourni');
	}

	jwt.verify(token, process.env.ACCESS_TOKEN as string, (error, userId) => {
		if (error) {
			return res.status(401).send('Pas autorisé');
		}

		req.body.user = userId;
		next();
	});
}

export default authToken;
