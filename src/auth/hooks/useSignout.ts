import { clearLocalStorageItem } from '@shared/storage';
import { STORAGE_KEYS, QUERY_KEYS } from '@shared/constants';
import { useMutation, useQueryClient } from 'react-query';
import { signOut } from 'next-auth/react';
import { fetchSignout } from '../remotes/fetchSignout';

export const useSignout = () => {
  const queryClient = useQueryClient();
  const { userAuth } = STORAGE_KEYS;
  const { user } = QUERY_KEYS;
  const { mutate, isLoading } = useMutation(fetchSignout, {
    onSuccess: () => {
      signOut();
      clearLocalStorageItem(userAuth);
      queryClient.setQueryData(user, null);
    }
  });

  return { mutate, isLoading };
};
