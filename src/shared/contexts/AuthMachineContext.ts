import { authMachine } from '@shared/machines/authMachine';
import { getLocalStorageItem } from '@shared/storage/getLocalStorageItem';
import { setLocalStorageItem } from '@shared/storage/setLocalStorageItem';
import { STORAGE_KEYS } from '@shared/constants/storageKeys';
import { createActorContext } from '@xstate/react';

export const rehydrateState = () => {
  if (typeof window === 'undefined') {
    return authMachine.initialState;
  }
  return getLocalStorageItem(STORAGE_KEYS.authState);
};

export const AuthMachineContext = createActorContext(authMachine, {}, (state) => {
  setLocalStorageItem(STORAGE_KEYS.authState, state);
});
