import { MongoClient } from 'mongodb';

export const GetAllUsers = async (
	conn: MongoClient,
	dbName: string,
	colName: string
): Promise<any> => {
	try {
		const db = await conn.db(dbName);
		const getUsers = await db.collection(colName).find().toArray();
		const validResponse: boolean = getUsers && getUsers.length > 0;
		if (!validResponse) {
			return [];
		}
		return getUsers;
	} catch (err) {
		return {
			error: JSON.stringify(err),
		};
	}
};
