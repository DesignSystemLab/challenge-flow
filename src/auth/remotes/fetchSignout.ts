import { auth } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { signOut } from 'firebase/auth';

export const fetchSignout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
