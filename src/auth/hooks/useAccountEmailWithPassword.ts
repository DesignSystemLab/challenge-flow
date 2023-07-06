import { User } from 'firebase/auth';
import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { signIn } from 'next-auth/react';
import { useSetUserAuthData } from './useSetUserAuthData';
import { fetchSignUpWithEmail } from '../remotes/fetchSignupWithEmail';
import { fetchSignInWithEmail } from '../remotes/fetchSignWithEmail';

export const useAccountEmailWithPassword = (
  signup: boolean,
  send: (props: { type: 'REGISTRY'; user: User }) => void
) => {
  const { updateUserData, clearUserData } = useSetUserAuthData();
  const { showBoundary } = useErrorBoundary();
  const fetchFn = signup ? fetchSignUpWithEmail : fetchSignInWithEmail;
  const { mutate, isLoading } = useMutation(fetchFn, {
    onSuccess: async (data) => {
      const { user, token: tokenId } = data;

      if (signup) {
        send({ type: 'REGISTRY', user });
        return;
      }

      if (user && tokenId) {
        signIn(
          'credentials',
          {
            callbackUrl: '/'
          },
          { tokenId, providerType: 'none' }
        );
        updateUserData(user);
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
