import { createContext } from 'react';

interface Props {
  currentUser:
    | {
        uid: string;
        email?: string;
        name?: string;
        image?: string;
      }
    | null
    | undefined;
}

export const ChallengeContext = createContext<Props>({
  currentUser: undefined
});
