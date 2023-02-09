import { HandleResponse, HandleValidMethod } from './handlers';
import { IRouter } from './interfaces';
import { conn } from './external/dbConn';
import { GetAllUsers, GetSingleUserByID } from './service';
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
	'/notFound': (_, res) => {
		HandleResponse(res, 404, 'message', 'File not Found');
	},
};
