import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@shared/firebase';
import { FirebaseError } from 'firebase/app';
import { EamilPasswordField } from '../types';

export const fetchSigninWithEmail = async ({ email, password }: EamilPasswordField): Promise<User> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const { code, message } = firebaseError;
    throw new Error(`errorCode: ${code}, errorMessage: ${message}`);
  }
};
