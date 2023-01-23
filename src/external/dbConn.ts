import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();

export const conn = new MongoClient(process.env.DB_URI!);

const GenerateDBConn = async (): Promise<any> => {
	try {
		const connection: MongoClient = await conn.connect();
		return connection;
	} catch (err) {
		throw new Error(err as any);
	}
};

GenerateDBConn()
	.then((client) => console.log(client))
	.catch((err) => console.error(err));
