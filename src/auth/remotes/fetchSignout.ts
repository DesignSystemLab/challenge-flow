import { auth } from '@shared/firebase';
import { signOut } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

export const fetchSignout = async (send: (state: string) => void) => {
  try {
    await signOut(auth);
    send('LOGGED_OUT');
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const { code, message } = firebaseError;
    throw new Error(`errorCode: ${code}, errorMessage: ${message}`);
  }
};
