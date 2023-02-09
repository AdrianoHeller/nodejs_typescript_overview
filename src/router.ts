import { HandleResponse, HandleValidMethod } from './handlers';
import { IDBUser, IRouter } from './interfaces';
import { conn } from './external/dbConn';
import {
	CreateNewUser,
	DeleteUserByID,
	GetAllUsers,
	GetSingleUserByID,
	UpdateSingleUserByID,
} from './service';
import { ObjectId } from 'mongodb';

export const Router: IRouter = {
	'/': (customReq, res) => {
		if (!HandleValidMethod(customReq, 'GET')) {
			HandleResponse(res, 405, 'message', 'Method not Allowed');
		}
		HandleResponse(res, 200, 'message', 'Ok');
	},
	'/users': async (_, res): Promise<any> => {
		try {
			const getUsers = await GetAllUsers(conn, 'bank', 'users');
			HandleResponse(res, 200, 'data', getUsers);
		} catch (err) {
			HandleResponse(res, 500, 'data', err);
		}
	},
	'/user': async (customReq, res): Promise<any> => {
		try {
			if (!HandleValidMethod(customReq, 'GET')) {
				HandleResponse(res, 405, 'message', 'Method not Allowed');
			}
			const { query } = customReq;
			const id = query.get('id');
			const validRequest = id?.length! > 0;
			if (!validRequest) {
				HandleResponse(res, 400, 'error', 'Bad Request');
			}
			const getUser = await GetSingleUserByID(
				conn,
				'bank',
				'users',
				new ObjectId(id!),
			);
			HandleResponse(res, 200, 'data', getUser);
		} catch (err) {
			HandleResponse(res, 500, 'data', err);
		}
	},
	'/user/create': async (customReq, res): Promise<any> => {
		try {
			if (!HandleValidMethod(customReq, 'POST')) {
				HandleResponse(res, 405, 'message', 'Method not Allowed');
			}
			const { body, bodyParser } = customReq;

			const parsedBody: IDBUser = bodyParser(body);

			const { age, name, email } = parsedBody;
			const createNewUser = await CreateNewUser(conn, 'bank', 'users', {
				name,
				email,
				age,
				isTerminated: false,
				hasWallet: false,
			});
			HandleResponse(res, 201, 'data', createNewUser);
		} catch (err) {
			HandleResponse(res, 500, 'data', err);
		}
	},
	'/user/update': async (customReq, res): Promise<any> => {
		try {
			if (!HandleValidMethod(customReq, 'PUT')) {
				HandleResponse(res, 405, 'message', 'Method not Allowed');
			}
			const { query, body, bodyParser } = customReq;

			const parsedBody: IDBUser = bodyParser(body);

			const { age, name, email } = parsedBody;

			const id = query.get('id');
			const validRequest = id?.length! > 0;
			if (!validRequest) {
				HandleResponse(res, 400, 'error', 'Bad Request');
			}
			const updateUser = await UpdateSingleUserByID(
				conn,
				'bank',
				'users',
				new ObjectId(id!),
				{ name, email, age },
			);
			HandleResponse(res, 201, 'data', updateUser);
		} catch (err) {
			HandleResponse(res, 500, 'data', err);
		}
	},
	'/user/delete': async (customReq, res): Promise<any> => {
		try {
			if (!HandleValidMethod(customReq, 'DELETE')) {
				HandleResponse(res, 405, 'message', 'Method not Allowed');
			}
			const { query } = customReq;
			const id = query.get('id');
			const validRequest = id?.length! > 0;
			if (!validRequest) {
				HandleResponse(res, 400, 'error', 'Bad Request');
			}
			const deleteUser = await DeleteUserByID(
				conn,
				'bank',
				'users',
				new ObjectId(id!),
			);
			HandleResponse(res, 201, 'data', deleteUser);
		} catch (err) {
			HandleResponse(res, 500, 'data', err);
		}
	},
	'/notFound': (_, res) => {
		HandleResponse(res, 404, 'message', 'File not Found');
	},
};
