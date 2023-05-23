import { useMutation } from 'react-query';
import { fetchSignupWithEmail } from '../remotes/fetchSignupWithEmail';

export const useSignupWithEmailMutation = (send: (state: string) => void) => {
  const { mutate } = useMutation(fetchSignupWithEmail, {
    onSuccess: (user) => {
      send('REGISTRY');
    },
    onError: (error) => {
      send('ERROR');
    }
  });

  return mutate;
};
