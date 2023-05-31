import { createMachine } from 'xstate';
import { STORAGE_KEYS, setLocalStorageItem } from '@shared/storage';
import type { User } from 'firebase/auth';

interface UserContext {
  user: User | null;
}

export type UserEvent =
  | { type: 'OAUTH' }
  | { type: 'EMAIL' }
  | { type: 'EMAIL' }
  | { type: 'CLEAR' }
  | { type: 'REGISTRY'; user: User }
  | { type: 'DONE' }
  | { type: 'BACK' };

export const signMachine = createMachine<UserContext, UserEvent>(
  {
    id: 'sign',
    initial: 'selection',
    context: {
      user: null
    },
    states: {
      selection: {
        on: {
          REGISTRY: {
            target: 'registry',
            actions: 'updateUser'
          },
          OAUTH: {
            target: 'oauth'
          },
          EMAIL: {
            target: 'email'
          }
        }
      },
      oauth: {
        on: {
          CLEAR: {
            target: 'selection'
          }
        }
      },
      email: {
        on: {
          CLEAR: {
            target: 'selection'
          },
          REGISTRY: {
            target: 'registry',
            actions: 'updateUser'
          },
          DONE: {
            target: 'done'
          }
        }
      },
      //등록 상태
      registry: {
        on: {
          CLEAR: {
            target: 'done'
          },
          BACK: {
            target: 'email'
          }
        }
      },
      //상태 종료
      done: {
        type: 'final'
      }
    }
  },
  {
    actions: {
      updateUser: (cotext, payload) => {
        if (payload.type === 'REGISTRY') {
          const { user } = payload;
          setLocalStorageItem(STORAGE_KEYS.userAuth, user);
          cotext.user = user;
        }
      }
    }
  }
);

export type SignMachineType = typeof signMachine;
