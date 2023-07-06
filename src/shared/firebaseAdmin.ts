import * as admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

interface PrivateKeyType {
  privateKey: string;
}

let parseKey = '';
const privateEnv = process.env.NEXT_PUBLIC_PRIVATE_KEY;
if (privateEnv) {
  const { privateKey } = JSON.parse(privateEnv) as PrivateKeyType;
  parseKey = privateKey;
}

const cert: ServiceAccount = {
  clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  privateKey: parseKey
};

const friebaseAdmin = admin.apps[0] ?? admin.initializeApp({ credential: admin.credential.cert(cert) });
export { friebaseAdmin };
