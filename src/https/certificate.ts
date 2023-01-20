import { readFileSync } from 'fs';

import { join } from 'path';
import { ICertificateData } from '../interfaces';

export const certificateData: ICertificateData = {
	cert: readFileSync(join(__dirname, `../../security/cert.pem`)),
	key: readFileSync(join(__dirname, `../../security/cert.key`)),
};
