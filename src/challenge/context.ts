import { createContext } from 'react';
import { ChallengeModifyFetchProps } from './types';

export const ChallengeContext = createContext({
  postInfo: {} as ChallengeModifyFetchProps,
  currentUser: {
    uid: ''
  }
});
