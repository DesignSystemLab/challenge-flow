import { auth } from '@shared/firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { errorMessage } from '@shared/errorMessage';

export const fetchAuthWithGithub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
