import { HandleValidMethod } from './handlers';
import { IRouter } from './interfaces';

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
	'/notFound': (_, res) => {
		res.writeHead(404);
		res.end(JSON.stringify({ message: 'File not Found' }));
		return;
	},
};
