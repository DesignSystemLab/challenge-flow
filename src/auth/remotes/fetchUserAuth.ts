import { auth } from '@shared/firebase';
import { QUREY_KEYS } from '@shared/constants';
import { setLocalStorageItem, STORAGE_KEYS } from '@shared/storage';
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
      reject(new Error('사용자 인증에 실패하였습니다.'));
    });
  });

export const useUserAuth = () => {
  const { data } = useQuery<User | null>(QUREY_KEYS.user, fetchUserAuth, {
    initialData: null,
    onSuccess: (user) => {
      setLocalStorageItem(STORAGE_KEYS.userAuth, user);
    }
  });

  return data;
};
