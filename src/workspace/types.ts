import { Session } from 'next-auth';
import type { DocumentReference } from 'firebase/firestore';
import type { UserProfile } from '@auth/types';
import type { ChallengeHookFormValues } from '@challenge/types';

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

export interface ChallengeDocRef extends ChallengeHookFormValues {
  members: DocumentReference[];
  duration: {
    start: string;
    end: string;
  };
}

/** data model */

export interface ContextProps {
  workspaceId: string;
  userSession: Session | null;
}

export interface Workspace {
  members: UserProfile[];
  challengeInfo: ChallengeDocRef;
}

export interface PostForm {
  postId: string;
  author: string;
  content: string;
  title: string;
  workspaceId: string;
  turn: PeriodFormat;
}
export interface Post {
  postId: string;
  authorId: string;
  author: string;
  content: string;
  isDeleted: boolean;
  title: string;
}
