import { createContext } from 'react';
import { ReactionDomain } from './types';

export const ReactionContext = createContext({
  originId: '',
  domain: 'challenge' as ReactionDomain,
  currentUser: {
    uid: ''
  }
});
