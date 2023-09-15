import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (userData: {
	username: string;
	email: string;
	password: string;
}) => {
	return await prisma.user.create({
		data: {
			username: userData.username,
			email: userData.email,
			password: userData.password
		}
	});
};
