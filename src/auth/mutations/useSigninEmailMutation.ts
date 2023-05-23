import { useMutation } from 'react-query';
import { fetchSigninWithEmail } from '../remotes/fetchsigninWithEmail';
import { AuthMachineContext } from '@shared/contexts/AuthMachineContext';

export const useSigninEmailMutation = (send: (state: string) => void) => {
  const { mutate } = useMutation(fetchSigninWithEmail, {
    onSuccess: (user) => {
      send('LOGGED_IN');
    },
    onError: (error) => {
      send('ERROR');
    }
  });

  return mutate;
};
