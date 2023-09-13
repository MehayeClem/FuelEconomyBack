import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUser = async (data: string) => {
	return await prisma.user.findFirst({
		where: {
			OR: [
				{ username: { equals: data, mode: 'insensitive' } },
				{
					email: { equals: data, mode: 'insensitive' }
				}
			]
		}
	});
};

export const findUserById = async (id: string) => {
	return await prisma.user.findFirst({
		where: {
			id: id
		}
	});
};

export const updateUser = async (id: string, data: string) => {
	return await prisma.user.update({
		where: {
			id: id
		},
		data: data
	});
};

export const deleteUser = async (username: string) => {
	await prisma.user.delete({
		where: {
			username: username
		}
	});
};
