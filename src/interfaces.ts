import { IncomingHttpHeaders, ServerResponse } from 'http';

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
