import { createContext } from 'react';
import type { ContextProps } from './types';

export const workspaceContext = createContext<ContextProps>({
  workspaceId: '',
  userSession: null
});
