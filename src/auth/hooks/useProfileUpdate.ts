import { fetchUpdateUserProfile } from '../remotes/fetchUpdateUserProfile';
import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { UserProfile } from '../types';
export const useProfileUpdate = (send: (props: { type: 'CLEAR' }) => void, uid?: string) => {
  const { showBoundary } = useErrorBoundary();
  const { mutate, isLoading } = useMutation((profile: UserProfile) => fetchUpdateUserProfile(profile, uid), {
    onSuccess: (data) => {
      send({ type: 'CLEAR' });
    },
    onError: (error) => {
      showBoundary(error);
    }
  });

  return { mutate, isLoading };
};
