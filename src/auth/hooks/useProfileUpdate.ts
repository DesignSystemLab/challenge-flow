import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { fetchUpdateUser } from '../remotes/fetchUpdateUser';
import type { UserProfile } from '../types';

export const useProfileUpdate = (send: (props: { type: 'CLEAR' }) => void, uid?: string) => {
  const { showBoundary } = useErrorBoundary();
  const { mutate, isLoading } = useMutation(
    (profile: Omit<UserProfile, 'uid' | 'challenges' | 'email'>) => fetchUpdateUser({ uid, profile }),
    {
      onSuccess: () => {
        send({ type: 'CLEAR' });
      },
      onError: (error) => {
        showBoundary(error);
      }
    }
  );

  return { mutate, isLoading };
};
