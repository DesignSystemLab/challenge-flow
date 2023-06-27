import type { DocumentReference } from 'firebase/firestore';
import type { UserProfile } from '@auth/types';
import type { ChallengeFormStates } from '@challenge/types';

/** firebase Ref Type */
export type PeriodFormat = `turn${number}`;

export type PostCommentRef = {
  post: DocumentReference;
  comments: DocumentReference[];
};

export interface WorkspaceDocRef {
  [key: PeriodFormat]: PostCommentRef[];
  challenge: DocumentReference;
  notice: string;
}

export interface ChallengeDocRef extends ChallengeFormStates {
  members: DocumentReference[];
  duration: {
    start: string;
    end: string;
  };
}

/** data model */

export interface Workspace {
  members: UserProfile[];
  challengeInfo: ChallengeDocRef;
}

export interface PostForm {
  author: string;
  content: string;
  title: string;
  workspaceId: string;
  turn: PeriodFormat;
}

export interface Post {
  author: string;
  content: string;
  isDeleted: boolean;
  title: string;
}
