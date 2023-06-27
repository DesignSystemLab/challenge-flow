import { createMachine } from 'xstate';

interface TurnContext {
  period: `turn${number}`;
  member: string | null;
}

export type WorkspaceEvent = { type: 'SELECT_PERIOD'; period: `turn${number}` } | { type: 'SELECT_MEMBER' };

export const workspaceMachine = createMachine<TurnContext, WorkspaceEvent>(
  {
    id: 'workspace',
    initial: 'inactive',
    predictableActionArguments: true,
    context: {
      member: null,
      period: 'turn1'
    },
    states: {
      inactive: {
        on: {
          SELECT_PERIOD: {
            target: 'active',
            actions: 'changeTurn'
          }
        }
      },
      active: {
        on: {
          SELECT_PERIOD: {
            target: 'inactive',
            actions: 'changeTurn'
          }
        }
      }
    }
  },
  {
    actions: {
      changeTurn: (context, payload) => {
        if (payload.type === 'SELECT_PERIOD') {
          const { period } = payload;
          context.period = period;
        }
      }
    }
  }
);

export type WorkspaceMachineType = typeof workspaceMachine;
