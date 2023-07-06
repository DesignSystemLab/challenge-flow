import * as admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

const cert: ServiceAccount = {
  clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY ? process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/gm, '\n') : ''
};

const friebaseAdmin = admin.apps[0] ?? admin.initializeApp({ credential: admin.credential.cert(cert) });
export { friebaseAdmin };
