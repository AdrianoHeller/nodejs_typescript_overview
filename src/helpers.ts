export const BodyParser = (buffer: string): Object => {
	try {
		const validBuffer: boolean = buffer.length > 0;
		return validBuffer ? JSON.parse(buffer) : new Object();
	} catch (err) {
		return {};
	}
};