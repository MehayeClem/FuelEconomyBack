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

export const updateUser = async (id: string, data: string) => {
	return await prisma.user.update({
		where: {
			id: id
		},
		data: data
	});
};
