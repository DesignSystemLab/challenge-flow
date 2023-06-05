import { clearLocalStorageItem } from '@shared/storage';
import { STORAGE_KEYS, QUREY_KEYS } from '@shared/constants';
import { useMutation, useQueryClient } from 'react-query';
import { fetchSignout } from '../remotes/fetchSignout';

export const useSignout = () => {
  const queryClient = useQueryClient();
  const { userAuth } = STORAGE_KEYS;
  const { user } = QUREY_KEYS;
  const { mutate, isLoading } = useMutation(fetchSignout, {
    onSuccess: () => {
      clearLocalStorageItem(userAuth);
      queryClient.setQueryData(user, null);
    }
  });

  return { mutate, isLoading };
};
