import { getApps, getApp, initializeApp } from 'firebase/app';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { ServiceAccount } from 'firebase-admin';

const cert: ServiceAccount = {
  clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};
const friebaseAdmin = admin.apps[0] ?? admin.initializeApp({ credential: admin.credential.cert(cert) });
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, database, auth, storage, friebaseAdmin };
