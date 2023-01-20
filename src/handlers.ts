import { IncomingMessage, ServerResponse } from 'http';
import { StringDecoder } from 'string_decoder';
import { BodyParser } from './helpers';
import { IRouter, ICustomReq } from './interfaces';
import { Router } from './router';

export const HandleRouteMethod = (
	router: IRouter,
	customReq: ICustomReq,
	res: ServerResponse
) => {
	const { path } = customReq;
	return Object.keys(router).includes(path)
		? router[path](customReq, res)
		: router['/notFound'](customReq, res);
};

export const HandleValidMethod = (
	req: ICustomReq,
	validMethod: string
): boolean => {
	return req.method === validMethod;
};

export function HandleRequestProcess(
	req: IncomingMessage,
	res: ServerResponse
): void {
	const { method, headers } = req;
	const baseURL: string = `http://${headers.host}`;

	const parsedURL = new URL(req?.url!, baseURL);

	const { pathname, searchParams } = parsedURL;

	let bufferString: string = ``;

	const decoder = new StringDecoder('utf-8');

	req.on('data', (data) => {
		bufferString += decoder.write(data);
	});

	req.on('end', () => {
		bufferString += decoder.end();

		const customReq: ICustomReq = {
			body: bufferString,
			method,
			headers,
			query: searchParams,
			path: pathname,
			bodyParser: BodyParser,
		};

		HandleRouteMethod(Router, customReq, res);
	});
}
