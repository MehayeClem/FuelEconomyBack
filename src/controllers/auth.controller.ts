import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return res
			.status(400)
			.send(
				'Missing required data. Please provide email, username and password'
			);
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const emailExist = await userService.checkIfUserExist(email);
	const usernameExist = await userService.checkIfUserExist(username);

	if (emailExist || usernameExist) {
		return res.status(400).send('User already exist');
	}

	const userData = {
		username: username,
		email: email,
		password: passwordHash
	};

	try {
		const newUser = await authService.register(userData);
		return res.status(201).send({
			data: newUser
		});
	} catch (error) {
		return res.status(500).send('Error while creating the user');
	}
};

export const login = async (req: Request, res: Response) => {
	const { data, password } = req.body;

	if (!data || !password) {
		return res
			.status(400)
			.send(
				'Missing required data. Please provide password and email or username'
			);
	}

	const user = await userService.getUser(data);

	if (!user) {
		return res.status(404).send('User not found');
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return res.status(400).send('Invalid password');
	}

	const accessToken = jwt.sign(
		{ userId: user.id },
		process.env.ACCESS_TOKEN as string,
		{
			expiresIn: '3600s'
		}
	);

	const refreshToken = jwt.sign(
		{ userId: user.id },
		process.env.REFRESH_TOKEN as string,
		{
			expiresIn: '86400s'
		}
	);

	return res.status(200).send({
		data: {
			accessToken: accessToken,
			refreshToken: refreshToken
		}
	});
};

export const refreshToken = async (req: Request, res: Response) => {
	const authHeader = req.headers['authorization'];
	console.log(authHeader);

	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).send('No token provided');
	}

	jwt.verify(
		token,
		process.env.REFRESH_TOKEN as string,
		async (error, user) => {
			const { iat, exp, ...data } = user as jwt.JwtPayload;

			if (error) {
				return res.status(401).send('Unauthorized');
			}

			if (!user) {
				return res.status(401).send('Unauthorized');
			}

			const userExist = await userService.checkIfUserExistById(data.userId);

			if (!userExist) {
				return res.status(404).send('User not found');
			}

			const newAccessToken = jwt.sign(
				{ userId: data.userId }, // Access userId from the user object
				process.env.ACCESS_TOKEN as string,
				{
					expiresIn: '3600s'
				}
			);

			return res.status(200).send({
				data: {
					accessToken: newAccessToken
				}
			});
		}
	);
};
