import { createContext } from 'react';
import type { ContextProps } from '../types';

export const WorkspaceGroupContext = createContext<ContextProps>({
  workspaceId: '',
  userSession: null
});
