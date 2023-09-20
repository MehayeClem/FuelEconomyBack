import * as userService from '../services/user.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const getUser = async (req: Request, res: Response) => {
	const userId = req.body.user.userId;

	try {
		const user = await userService.getUserById(userId);
		return res.status(200).send({
			user
		});
	} catch (error) {
		return res
			.status(500)
			.send("Erreur pendant la récupération des données de l'utilisateur");
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { data } = req.body;
	const userId = req.params.id;

	if (!data) {
		return res
			.status(400)
			.send(
				'Données manquantes. Merci de fournir une adresse mail ou un pseudonyme'
			);
	}

	const emailExist = await userService.checkIfUserExist(data.email);
	const usernameExist = await userService.checkIfUserExist(data.username);

	if (usernameExist) {
		return res.status(400).send('Le pseudonyme existe déjà');
	}

	if (emailExist) {
		return res.status(400).send("L'adresse mail existe déjà");
	}

	try {
		const updatedUser = await userService.updateUser(userId, data);
		return res.status(200).send({
			user: updatedUser,
			message: 'Vos données ont bien été modifiée'
		});
	} catch (error) {
		return res
			.status(500)
			.send("Erreur pendant la modification de l'utilisateur");
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const userId = req.params.id;

	const userExist = await userService.checkIfUserExistById(userId);

	if (!userExist) {
		return res.status(404).send("L'utilisateur n'existe pas");
	}

	try {
		await userService.deleteUser(userId);
		return res.status(200).send('Utilisateur supprimé');
	} catch (error) {
		return res
			.status(500)
			.send("Erreur pendant la suppression de l'utilisateur");
	}
};

export const addGasStation = async (req: Request, res: Response) => {
	const { gasStation } = req.body;
	const userId = req.params.id;

	if (!gasStation) {
		return res
			.status(400)
			.send("Données manquantes. Merci de fournir une station d'essence");
	}

	const existingUser = await userService.getUserById(userId);

	if (!existingUser) {
		return res.status(404).send("L'utilisateur n'existe pas");
	}

	const existingGasStations = existingUser.gasStations.map(
		(gasStation: string) => gasStation
	);

	const newGasStations = [...new Set([...existingGasStations, ...gasStation])];

	try {
		await userService.addGasStation(userId, newGasStations);
		return res.status(201).send('Station service ajoutée');
	} catch (error) {
		return res
			.status(500)
			.send("Erreur pendant l'ajout de la station service");
	}
};

export const deleteGasStation = async (req: Request, res: Response) => {
	const { gasStations } = req.body;
	const userId = req.params.id;

	if (!gasStations) {
		return res
			.status(400)
			.send(
				"Données manquantes. Merci de fournir au moins une station d'essence"
			);
	}

	const existingUser = await userService.getUserById(userId);

	if (!existingUser) {
		return res.status(404).send("L'utilisateur n'existe pas");
	}

	const existingGasStations = existingUser.gasStations.map(
		(gasStation: string) => gasStation
	);

	const updatedGasStations = existingGasStations.filter(
		(gasStation: string) => !gasStations.includes(gasStation)
	);

	try {
		await userService.addGasStation(userId, updatedGasStations);
		return res.status(201).send({
			gasStations: updatedGasStations,
			message: 'Station service supprimée'
		});
	} catch (error) {
		return res
			.status(500)
			.send('Erreur pendant la suppression des stations services');
	}
};
