import { errorMessage } from '@shared/errorMessage';
import { auth } from '@shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { User } from 'firebase/auth';
import type { EamilPasswordField } from '../types';

export const fetchSignUpWithEmail = async ({ email, password }: EamilPasswordField): Promise<User> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
