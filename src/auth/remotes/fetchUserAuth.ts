import { useQuery } from 'react-query';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { QUREY_KEYS } from '@shared/constants/reactQueryKeys';
import { setLocalStorageItem, STORAGE_KEYS } from '@shared/storage';
import type { User } from 'firebase/auth';

export const fetchUserAuth = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
        return;
      }
      reject(null);
    });
  });
};

export const useUserAuth = () => {
  const { data: user } = useQuery<User | null>(QUREY_KEYS.user, fetchUserAuth, {
    initialData: null,
    onSuccess: (user) => {
      setLocalStorageItem(STORAGE_KEYS.userAuth, user);
    }
  });

  return user;
};
