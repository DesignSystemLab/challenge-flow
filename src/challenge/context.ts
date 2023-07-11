import { createContext } from 'react';

export const ChallengeContext = createContext({
  currentUser: {
    uid: ''
  }
});
