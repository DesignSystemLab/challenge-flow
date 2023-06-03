import { fetchUserAuth } from '@auth/remotes/fetchUserAuth';
import { setLocalStorageItem } from '@shared/storage/setLocalStorageItem';
import { assign, createMachine } from 'xstate';
import type { User } from 'firebase/auth';

export const authMachine = createMachine(
  {
    id: 'auth',
    initial: 'checking',
    schema: {
      context: {} as { userInfo: User | null }
    },
    context: {
      userInfo: null
    },
    states: {
      checking: {
        invoke: {
          id: 'checking',
          src: fetchUserAuth,
          onDone: {
            target: 'loggedIn',
            actions: assign({ userInfo: (_, event) => event.data })
          },
          onError: {
            target: 'loggedOut',
            actions: assign({ userInfo: null })
          }
        },
        on: {
          LOGGED_IN: {
            target: 'loggedIn'
          },
          LOGGED_OUT: {
            target: 'loggedOut'
          }
        }
      },
      loggedIn: {
        entry: 'setNewUser',
        on: {
          LOGGED_OUT: { target: 'loggedOut' }
        }
      },
      loggedOut: {
        entry: 'clearUser',
        on: {
          LOGGED_IN: { target: 'loggedIn' }
        }
      }
    }
  },
  {
    actions: {
      setNewUser: (context) => {
        setLocalStorageItem<User>('authMachine', context.userInfo as User);
      },
      clearUser: () => {
        setLocalStorageItem<null>('authMachine', null);
      }
    }
  }
);
export type AuthMachineType = typeof authMachine;
