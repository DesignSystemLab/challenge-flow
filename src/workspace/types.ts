import type { DocumentReference } from 'firebase/firestore';
import type { UserProfile } from '@auth/types';
import type { ChallengeFormStates } from '@challenge/types';

/** firebase Ref Type */
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

export interface WorkspaceDocRef {
  challenge: DocumentReference;
  notice: string;
  turns?: Turns;
}

export interface ChallengeDocRef extends ChallengeFormStates {
  members: DocumentReference[];
}

/** data model */

export interface Workspace {
  members: UserProfile[];
  challengeInfo: ChallengeDocRef;
}
