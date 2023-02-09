import { HandleValidMethod } from './handlers';
import { IRouter } from './interfaces';
import { conn } from './external/dbConn';
import { GetAllUsers } from './service';
import {
	FileNotFound,
	HandleResponse,
	MethodNotAllowed,
	StatusOK,
} from './helpers';
import { ObjectId } from 'bson';

export const Router: IRouter = {
	'/': (customReq, res) => {
		if (!HandleValidMethod(customReq, 'GET')) {
			HandleResponse(res, 405, MethodNotAllowed, 'message');
		}
		HandleResponse(res, 200, StatusOK, 'message');
	},
	'/users': async (_, res): Promise<any> => {
		try {
			const getUsers = await GetAllUsers(conn, 'bank', 'users');
			HandleResponse(res, 200, getUsers, 'data');
		} catch (err) {
			HandleResponse(res, 500, err, 'error');
		}
	},

	'/notFound': (_, res) => {
		HandleResponse(res, 404, FileNotFound, 'message');
	},
};
