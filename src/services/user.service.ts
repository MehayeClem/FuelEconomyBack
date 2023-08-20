import * as repository from '../repositories/user.repository';

export const checkIfUserExist = async (data: string) => {
	const user = await repository.findUser(data);
	return user !== null;
};

export const getUser = async (data: string) => {
	return await repository.findUser(data);
};

export const updateUser = async (id: string, data: string) => {
	return await repository.updateUser(id, data);
};

export const deleteUser = async (id: string) => {
	await repository.deleteUser(id);
};
