import { ServerResponse } from 'http';

export const BodyParser = (buffer: string): Record<string, unknown> => {
	try {
		const validBuffer: boolean = buffer.length > 0;
		return validBuffer ? JSON.parse(buffer) : {};
	} catch (err) {
		return {};
	}
};

export const HandleResponse = (
	res: ServerResponse,
	statusCode: number,
	data: any,
	targetKey: string,
) => {
	res.setHeader('Content-Type', 'application/json');
	res.writeHead(statusCode);
	res.end(JSON.stringify({ [targetKey]: data }));
	return;
};
//Messages of http responses
export const MethodNotAllowed = 'Method not allowed';
export const StatusOK = 'Ok';
export const FileNotFound = 'File not Found';
