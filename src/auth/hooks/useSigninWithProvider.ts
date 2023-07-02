import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { signIn } from 'next-auth/react';
import { useSetUserAuthData } from './useSetUserAuthData';
import { fetchAuthWithGoogle } from '../remotes/fetchAuthWithGoogle';
import { fetchAuthWithGithub } from '../remotes/fetchAuthWithGithub';
import type { AuthProvider } from '../types';

export const useSigninWithProvider = (providerType: AuthProvider, send: (props: { type: 'CLEAR' }) => void) => {
  const { updateUserData, clearUserData } = useSetUserAuthData();
  const { showBoundary } = useErrorBoundary();
  const fetchAuthFuntion = providerType === 'GITHUB' ? fetchAuthWithGithub : fetchAuthWithGoogle;
  const { mutate, isLoading } = useMutation(fetchAuthFuntion, {
    onSuccess: async (data) => {
      if (data) {
        const tokenId = await data.getIdToken(true);
        updateUserData(data);
        signIn(
          'credentials',
          {
            callbackUrl: '/'
          },
          { tokenId, providerType }
        );
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
