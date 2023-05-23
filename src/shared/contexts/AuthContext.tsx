import { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { authMachine } from '../machines/authMachine';
import { getLocalStorageItem } from '@shared/storage/getLocalStorageItem';
import { setLocalStorageItem } from '@shared/storage/setLocalStorageItem';
import type { AnyEventObject, InterpreterFrom, StateConfig } from 'xstate';
import type { User } from 'firebase/auth';
import { STORAGE_KEYS } from '@shared/constants/storageKeys';

type AuthMachineState = StateConfig<
  {
    userInfo: User | null;
  },
  AnyEventObject
>;

const rehydreateState = (): AuthMachineState => {
  const persistState = getLocalStorageItem<AuthMachineState>(STORAGE_KEYS.authState);
  if (typeof window === 'undefined' || !persistState) {
    return authMachine.initialState;
  }
  return persistState;
};

export const AuthContext = createContext({ authService: {} as InterpreterFrom<typeof authMachine> });

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const authService = useInterpret(authMachine, {
    state: rehydreateState()
  }).onTransition((state) => {
    console.log('하이로', state);
    setLocalStorageItem<AuthMachineState>(STORAGE_KEYS.authState, state);
  });

  return <AuthContext.Provider value={{ authService }}>{props.children}</AuthContext.Provider>;
};
