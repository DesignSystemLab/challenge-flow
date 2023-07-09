import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { fetchCreateUser } from '../remotes/fetchCreateUser';

type RequiredUserInfo = {
  email: string | null;
  uid: string;
};

export const useCreateUserMutation = (successAction?: () => void) => {
  const { showBoundary } = useErrorBoundary();
  const { mutate, isLoading } = useMutation(
    ({ email, uid }: RequiredUserInfo) => fetchCreateUser({ uid, profile: { email } }),
    {
      onError: (error) => {
        showBoundary(error);
      },
      onSuccess: () => {
        if (successAction) {
          successAction();
        }
      }
    }
  );
  return { mutate, isLoading };
};
