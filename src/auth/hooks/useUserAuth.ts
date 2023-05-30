import { useQuery } from 'react-query';
import { auth } from '@shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { QUREY_KEYS } from '@shared/constants/reactQueryKeys';
import { getLocalStorageItem, setLocalStorageItem, clearLocalStorageItem, STORAGE_KEYS } from '@shared/storage/';
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
  const { userAuth } = STORAGE_KEYS;
  const { data: user } = useQuery<User | null>(QUREY_KEYS.user, fetchUserAuth, {
    staleTime: 60000,
    cacheTime: 90000,
    initialData: auth.currentUser,
    onSuccess: (user) => {
      setLocalStorageItem(userAuth, user);
    },
    onError: () => {
      clearLocalStorageItem(userAuth);
    }
  });

  return { user };
};
