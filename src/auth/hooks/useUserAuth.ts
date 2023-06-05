import { auth } from '@shared/firebase';
import { QUREY_KEYS, STORAGE_KEYS } from '@shared/constants';
import { getLocalStorageItem } from '@shared/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useQuery } from 'react-query';
import type { User } from 'firebase/auth';

export const fetchUserAuth = (): Promise<User | null> =>
  new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
      },
      (error) => {
        reject(error);
      }
    );
  });

export const useUserAuth = () => {
  const { userAuth } = STORAGE_KEYS;
  const { data } = useQuery(QUREY_KEYS.user, fetchUserAuth, {
    staleTime: 30000,
    cacheTime: 60000,
    initialData: getLocalStorageItem(userAuth)
  });

  return { data: data ?? null };
};
