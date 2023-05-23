import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

export const fetchUserAuth = (): Promise<User | null> => {
  return new Promise((resolve, react) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
        return;
      }
      react(null);
    });
  });
};
