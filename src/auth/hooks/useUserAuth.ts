import { auth } from '@shared/firebase';
import { QUREY_KEYS } from '@shared/constants/reactQueryKeys';
import { setLocalStorageItem, clearLocalStorageItem, STORAGE_KEYS } from '@shared/storage/';
import { onAuthStateChanged } from 'firebase/auth';
import { useQuery } from 'react-query';
import type { User } from 'firebase/auth';

export const fetchUserAuth = (): Promise<User | null> =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
        return;
      }
      reject(new Error('사용자가 존재하지 않습니다.'));
    });
  });

export const useUserAuth = () => {
  const { userAuth } = STORAGE_KEYS;
  const { data } = useQuery<User | null>(QUREY_KEYS.user, fetchUserAuth, {
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

  return { data };
};
