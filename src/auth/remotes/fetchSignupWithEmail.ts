import { auth } from '@shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { User } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { EamilPasswordField } from '../types';

export const fetchSignupWithEmail = async ({ email, password }: EamilPasswordField): Promise<User> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const { currentUser } = auth;
    if (currentUser) {
      return user;
    }
    throw new Error('회원가입에 실패하였습니다.');
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const { code, message } = firebaseError;
    throw new Error(`errorCode: ${code}, errorMessage: ${message}`);
  }
};
