// import { config } from 'dotenv';
import {
	createServer as HTTPServer,
	IncomingMessage,
	ServerResponse,
} from 'http';

import { HandleRequestProcess } from './handlers';

import { createServer as HTTPSServer } from 'https';
import { certificateData } from './https/certificate';

// config();

HTTPServer((req: IncomingMessage, res: ServerResponse) =>
	HandleRequestProcess(req, res),
).listen(process.env.HTTP_PORT, () =>
	console.log(`HTTP server listening on ${process.env.HTTP_PORT}`),
);
HTTPSServer(certificateData, (req: IncomingMessage, res: ServerResponse) =>
	HandleRequestProcess(req, res),
).listen(process.env.HTTPS_PORT, () =>
	console.log(`HTTPS server listening on ${process.env.HTTPS_PORT}`),
);
