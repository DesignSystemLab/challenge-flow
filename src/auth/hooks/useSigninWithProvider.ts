import { fetchAuthWithGoogle } from '../remotes/fetchAuthWithGoogle';
import { fetchAuthWithGithub } from '../remotes/fetchAuthWithGithub';
import { useSetUserAuthData } from '../hooks/useSetUserAuthData';
import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import type { AuthProvider } from '../types';

export const useSigninWithProvider = (providerType: AuthProvider, send: (props: { type: 'CLEAR' }) => void) => {
  const { updateUserData, clearUserData } = useSetUserAuthData();
  const { showBoundary } = useErrorBoundary();
  const fetchAuthFuntion = providerType === 'GITHUB' ? fetchAuthWithGithub : fetchAuthWithGoogle;
  const { mutate, isLoading } = useMutation(fetchAuthFuntion, {
    onSuccess: (data) => {
      if (data) {
        updateUserData(data);
        send({ type: 'CLEAR' });
        return;
      }
      clearUserData();
    },
    onError: (error) => {
      showBoundary(error);
    }
  });

  return { mutate, isLoading };
};
