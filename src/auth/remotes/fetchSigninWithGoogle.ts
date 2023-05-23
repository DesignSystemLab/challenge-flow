import { auth } from '@shared/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

export const fetchSigninWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const { code, message } = firebaseError;
    throw new Error(`errorCode: ${code}, errorMessage: ${message}`);
  }
};
