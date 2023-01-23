import { HandleValidMethod } from './handlers';
import { IRouter } from './interfaces';
import { conn } from './external/dbConn';
import { GetAllUsers } from './service';

export const Router: IRouter = {
	'/': (customReq, res) => {
		if (!HandleValidMethod(customReq, 'GET')) {
			res.writeHead(405);
			res.end(JSON.stringify({ message: 'Method not allowed' }));
			return;
		}
		res.writeHead(200);
		res.end(JSON.stringify({ message: 'OK' }));
		return;
	},
	'/users': async (customReq, res): Promise<any> => {
		try {
			const getUsers = await GetAllUsers(conn, 'bank', 'users');
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(200);
			res.end(JSON.stringify({ data: getUsers }));
			return;
		} catch (err) {
			res.writeHead(500);
			res.end(JSON.stringify({ data: err }));
			return;
		}
	},
	'/notFound': (_, res) => {
		res.writeHead(404);
		res.end(JSON.stringify({ message: 'File not Found' }));
		return;
	},
};
