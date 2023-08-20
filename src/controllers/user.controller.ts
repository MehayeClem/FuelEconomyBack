import * as userService from '../services/user.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const updateUser = async (req: Request, res: Response) => {
	const { user, data } = req.body;

	if (!data) {
		return res
			.status(400)
			.send(
				'Missing required data. Please provide email, username or password'
			);
	}

	const emailExist = await userService.checkIfUserExist(data.email);
	const usernameExist = await userService.checkIfUserExist(data.username);

	if (emailExist || usernameExist) {
		return res.status(400).send('User already exist');
	}

	if (data.password) {
		const hashedPassword = await bcrypt.hash(data.password, 10);
		data.password = hashedPassword;
	}

	try {
		const updatedUser = await userService.updateUser(user.userId, data);
		return res.status(200).send(updatedUser);
	} catch (error) {
		return res.status(500).send('Error while updating the user');
	}
};
