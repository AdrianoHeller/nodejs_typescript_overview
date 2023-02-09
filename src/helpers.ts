import { ServerResponse } from 'http';

export const BodyParser = (buffer: string): Record<string, unknown> => {
	try {
		const validBuffer: boolean = buffer.length > 0;
		return validBuffer ? JSON.parse(buffer) : {};
	} catch (err) {
		return {};
	}
};
