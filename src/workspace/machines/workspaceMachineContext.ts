import { createActorContext } from '@xstate/react';
import { workspaceMachine } from './workspaceMachine';

export const workspaceMachineContext = createActorContext(workspaceMachine);
