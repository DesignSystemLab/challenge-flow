import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { User } from 'firebase/auth';
import { fetchSignUpWithEmail } from '../remotes/fetchSignupWithEmail';
import { fetchSignInWithEmail } from '../remotes/fetchSignWithEmail';
import { useSetUserAuthData } from '../hooks/useSetUserAuthData';

export const useAccountEmailWithPassword = (
  signup: boolean,
  send: (props: { type: 'REGISTRY'; user: User }) => void
) => {
  const { updateUserData, clearUserData } = useSetUserAuthData();
  const { showBoundary } = useErrorBoundary();
  const fetchFn = signup ? fetchSignUpWithEmail : fetchSignInWithEmail;
  const { mutate, isLoading } = useMutation(fetchFn, {
    onSuccess: (data) => {
      send({ type: 'REGISTRY', user: data });
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
