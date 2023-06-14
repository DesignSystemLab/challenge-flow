import type { DocumentReference } from 'firebase/firestore';
import type { UserProfile } from '@auth/types';
import type { ChallengeFormStates } from '@challenge/types';

type PostCommentRef = {
  post: DocumentReference;
  comments: DocumentReference;
};

export interface Turns {
  turns?: PostCommentRef[];
  turn1?: PostCommentRef[];
  turn2?: PostCommentRef[];
  turn3?: PostCommentRef[];
  turn4?: PostCommentRef[];
  turn5?: PostCommentRef[];
  [turn: string]: PostCommentRef[] | undefined;
}

export interface Workspace {
  challenge: DocumentReference;
  notice: string;
}

export interface WorkspaceChallenge extends ChallengeFormStates {
  members: DocumentReference[];
}

export interface WorkpspaceStates {
  members: UserProfile[];
  challengeInfo: WorkspaceChallenge;
}
