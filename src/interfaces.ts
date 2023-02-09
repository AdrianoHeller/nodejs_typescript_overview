import { IncomingHttpHeaders, ServerResponse } from 'http';
import { ObjectId } from 'mongodb';

export interface ICustomReq {
	method: string | undefined;
	headers: IncomingHttpHeaders;
	path: string;
	query: URLSearchParams;
	body: string;
	bodyParser: (str: string) => {};
}

export interface IRouter {
	[k: string]: (req: ICustomReq, res: ServerResponse) => void;
}

export interface ICertificateData {
	cert: Buffer;
	key: Buffer;
}

export interface IDBUser {
	_id?: ObjectId;
	name?: string;
	email?: string;
	age?: number;
	isTerminated?: boolean;
	hasWallet?: boolean;
}
