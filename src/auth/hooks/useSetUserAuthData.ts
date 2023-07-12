import { QUERY_KEYS } from '@shared/constants';
import { useQueryClient } from 'react-query';
import { User } from 'firebase/auth';

export const useSetUserAuthData = () => {
  const queryClient = useQueryClient();
  const { user } = QUERY_KEYS;

  const updateUserData = (newData: User | null) => {
    queryClient.setQueryData(user, newData);
  };

  const clearUserData = () => {
    queryClient.setQueryData(user, null);
  };

  return { updateUserData, clearUserData };
};
