import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (userData: {
	username: string;
	email: string;
	password: string;
}) => {
	const user = await prisma.user.create({
		data: userData
	});

	return user;
};
