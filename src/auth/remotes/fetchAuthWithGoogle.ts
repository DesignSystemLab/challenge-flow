import { auth } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const fetchAuthWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
