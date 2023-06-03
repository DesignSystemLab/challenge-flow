import { auth } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

export const fetchAuthWithGithub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
