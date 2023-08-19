import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

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
