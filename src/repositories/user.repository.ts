import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUser = async (data: string) => {
	const user = await prisma.user.findFirst({
		where: {
			OR: [
				{ username: { equals: data, mode: 'insensitive' } },
				{
					email: { equals: data, mode: 'insensitive' }
				}
			]
		}
	});

	return user;
};
