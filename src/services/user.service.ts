import * as repository from '../repositories/user.repository';

export const checkIfUserExist = async (data: string) => {
	const user = await repository.findUser(data);
	return user !== null;
};

export const getUser = async (data: string) => {
	const user = await repository.findUser(data);
	return user;
};
