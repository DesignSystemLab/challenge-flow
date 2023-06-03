import { QUREY_KEYS } from '@shared/constants/reactQueryKeys';
import { useQueryClient } from 'react-query';
import { User } from 'firebase/auth';

export const useSetUserAuthData = () => {
  const queryClient = useQueryClient();
  const { user } = QUREY_KEYS;

  const updateUserData = (newData: User | null) => {
    queryClient.setQueryData(user, newData);
  };

  const clearUserData = () => {
    queryClient.setQueryData(user, null);
  };

  return { updateUserData, clearUserData };
};
