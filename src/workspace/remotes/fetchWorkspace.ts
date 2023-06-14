import { database } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { getDoc, doc } from 'firebase/firestore';
import type { Workspace, WorkspaceChallenge, WorkpspaceStates } from '../types';
import type { UserProfile } from '@auth/types';

export const fetchWorkspace = async (): Promise<WorkpspaceStates> => {
  try {
    const ref = doc(database, 'workspace', 'JI7P1eXtAReQdlHcO9s4');
    const workspaceDoc = (await getDoc(ref)).data() as Workspace;
    const challengeRef = await getDoc(workspaceDoc.challenge);
    const challenge = challengeRef.data() as unknown as WorkspaceChallenge;
    const members = (await Promise.all(
      challenge.members.map(async (member) => (await getDoc(member)).data())
    )) as UserProfile[];

    return {
      members,
      challengeInfo: challenge
    };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
