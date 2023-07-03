import { errorMessage } from '@shared/errorMessage';
import { auth } from '@shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { EamilPasswordField, UserSession } from '../types';

export const fetchSignUpWithEmail = async ({ email, password }: EamilPasswordField): Promise<UserSession> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const token = await user.getIdToken();
    return { user, token };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
