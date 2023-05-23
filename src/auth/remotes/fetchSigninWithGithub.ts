import { auth } from '@shared/firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

export const fetchSigninWithGithub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const { code, message } = firebaseError;
    throw new Error(`errorCode: ${code}, errorMessage: ${message}`);
  }
};
