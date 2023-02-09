import { MongoClient, ObjectId } from 'mongodb';
import { IDBUser } from './interfaces';

export const GetAllUsers = async (
	conn: MongoClient,
	dbName: string,
	colName: string,
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

export const GetSingleUserByID = async (
	conn: MongoClient,
	dbName: string,
	colName: string,
	_id: ObjectId,
): Promise<any> => {
	try {
		const db = await conn.db(dbName);
		const getUser = await db.collection(colName).findOne({
			_id: new ObjectId(_id),
		});
		const validResponse = getUser?._id;
		if (!validResponse) {
			return {
				message: `Could not retrieve referred user`,
			};
		}
		return getUser;
	} catch (err) {
		return {
			error: JSON.stringify(err),
		};
	}
};

export const UpdateSingleUserByID = async (
	conn: MongoClient,
	dbName: string,
	colName: string,
	_id: ObjectId,
	data: IDBUser,
): Promise<any> => {
	try {
		const db = await conn.db(dbName);
		const updateUser = await db.collection(colName).findOneAndUpdate(
			{
				_id: new ObjectId(_id),
			},
			{
				$set: data,
			},
			{ upsert: true },
		);
		const validResponse = updateUser?.ok;
		if (!validResponse) {
			return {
				message: `Could not update referred user.`,
			};
		}
		return updateUser;
	} catch (err) {
		return {
			error: JSON.stringify(err),
		};
	}
};
