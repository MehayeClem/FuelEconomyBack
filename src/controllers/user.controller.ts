import * as userService from '../services/user.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const updateUser = async (req: Request, res: Response) => {
	const { user, data } = req.body;

	if (!data) {
		return res
			.status(400)
			.send(
				'Données manquantes. Merci de fournir une adresse mail, un mot de passe et un pseudonyme'
			);
	}

	const emailExist = await userService.checkIfUserExist(data.email);
	const usernameExist = await userService.checkIfUserExist(data.username);

	if (emailExist || usernameExist) {
		return res.status(400).send("L'utilisateur existe déjà");
	}

	if (data.password) {
		const hashedPassword = await bcrypt.hash(data.password, 10);
		data.password = hashedPassword;
	}

	try {
		const updatedUser = await userService.updateUser(user.userId, data);
		return res.status(200).send({
			data: updatedUser
		});
	} catch (error) {
		return res
			.status(500)
			.send("Erreur pendant la modification de l'utilisateur");
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const userId = req.body.user.userId;

	try {
		await userService.deleteUser(userId);
		return res.status(200).send('Utilisateur supprimé');
	} catch (error) {
		return res
			.status(500)
			.send("Erreur pendant la suppression de l'utilisateur");
	}
};

export const getUser = async (req: Request, res: Response) => {
	const userId = req.body.user.userId;

	try {
		const user = await userService.getUserById(userId);
		return res.status(200).send({
			data: user
		});
	} catch (error) {
		return res
			.status(500)
			.send("Erreur pendant la récupération des données de l'utilisateur");
	}
};
