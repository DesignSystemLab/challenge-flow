import { createMachine } from 'xstate';

export const signMachine = createMachine({
  id: 'sign',
  initial: 'selection',
  context: {
    user: null
  },
  states: {
    selection: {
      on: {
        OAUTH: {
          target: 'oauth'
        },
        EMAIL: {
          target: 'email'
        },
        REGISTRY: {
          target: 'registry'
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
          target: 'registry'
        },
        DONE: {
          target: 'done'
        }
      }
    },
    registry: {
      on: {
        CLEAR: {
          target: 'selection'
        },
        BACK: {
          target: 'email'
        }
      }
    },
    done: {
      type: 'final'
    }
  }
});

export type SignMachineType = typeof signMachine;
