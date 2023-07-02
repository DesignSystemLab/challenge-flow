import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { User } from 'firebase/auth';
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
      const tokenId = await data.getIdToken(true);
      send({ type: 'REGISTRY', user: data });
      signIn(
        'credentials',
        {
          callbackUrl: '/'
        },
        { tokenId, providerType: 'none' }
      );

      if (!signup) {
        if (data) {
          updateUserData(data);
          return;
        }
        clearUserData();
      }
    },
    onError: (error) => {
      showBoundary(error);
    }
  });

  return { mutate, isLoading };
};
