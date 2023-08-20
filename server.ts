import app from './src';
import * as dotenv from 'dotenv';

dotenv.config();

try {
	app.listen(process.env.EXPRESS_PORT, () => {
		console.log(`Server is running on http://localhost:8081`);
	});
} catch (error) {
	console.error(error);
}
