import * as repository from '../repositories/auth.repository';

export const register = async (userData: {
	username: string;
	email: string;
	password: string;
}) => {
	return await repository.register(userData);
};
