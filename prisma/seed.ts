import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	const passwordClement = await bcrypt.hash('Clément-33%', 10);
	const passwordRomain = await bcrypt.hash('Romain-33%', 10);

	await prisma.user.upsert({
		where: { email: 'clement@gmail.com' },
		update: {},
		create: {
			username: 'Naara',
			email: 'clement@gmail.com',
			password: passwordClement
		}
	});

	await prisma.user.upsert({
		where: { email: 'romain@gmail.com' },
		update: {},
		create: {
			username: 'Skynix',
			email: 'romain@gmail.com',
			password: passwordRomain
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect;
	})
	.catch(async error => {
		console.error(error);
		await prisma.$disconnect;
		process.exit(1);
	});
