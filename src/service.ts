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

export const DeleteUserByID = async (
	conn: MongoClient,
	dbName: string,
	colName: string,
	_id: ObjectId,
): Promise<any> => {
	try {
		const db = await conn.db(dbName);
		const deleteUser = await db.collection(colName).findOneAndDelete({
			_id: new ObjectId(_id),
		});
		const validResponse = deleteUser?.ok;
		if (!validResponse) {
			return {
				message: `Could not delete referred user`,
			};
		}
		return deleteUser;
	} catch (err) {
		return {
			error: JSON.stringify(err),
		};
	}
};

export const CreateNewUser = async (
	conn: MongoClient,
	dbName: string,
	colName: string,
	data: IDBUser,
): Promise<any> => {
	try {
		const db = await conn.db(dbName);
		const insertNewUser = await db.collection(colName).insertOne(data);
		const validResponse = insertNewUser?.acknowledged;
		if (!validResponse) {
			return {
				message: `Could not insert referred user data.`,
			};
		}
		return insertNewUser;
	} catch (err) {
		return {
			error: JSON.stringify(err),
		};
	}
};
