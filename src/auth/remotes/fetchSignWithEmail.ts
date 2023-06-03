import { auth } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import type { EamilPasswordField } from '../types';

export const fetchSignInWithEmail = async ({ email, password }: EamilPasswordField): Promise<User> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
