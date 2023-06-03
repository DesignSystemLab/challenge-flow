import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { fetchAuthWithGoogle } from '../remotes/fetchAuthWithGoogle';
import { fetchAuthWithGithub } from '../remotes/fetchAuthWithGithub';
import type { User } from 'firebase/auth';
import type { AuthProvider } from '../types';

export const useSignupWithProvider = (
  providerType: AuthProvider,
  send: (props: { type: 'REGISTRY'; user: User }) => void
) => {
  const { showBoundary } = useErrorBoundary();
  const fetchAuthFuntion = providerType === 'GITHUB' ? fetchAuthWithGithub : fetchAuthWithGoogle;
  const { mutate, isLoading } = useMutation(fetchAuthFuntion, {
    onSuccess: (data) => {
      send({ type: 'REGISTRY', user: data });
    },
    onError: (error) => {
      showBoundary(error);
    }
  });

  return { mutate, isLoading };
};
