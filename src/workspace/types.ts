import { Session } from 'next-auth';
import type { DocumentReference } from 'firebase/firestore';
import type { UserProfile } from '@auth/types';
import type { ChallengeHookFormValues, ChallengePostFields } from '@challenge/types';

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
export type WorkspaceOpenType = 'all' | 'public' | 'private';
export interface ContextProps {
  workspaceId: string;
  userSession: Session | null;
}

export interface Workspace {
  members: UserProfile[];
  challengeInfo: ChallengeDocRef;
}

export interface WorkspaceWithChallenge {
  workspaceId: string;
  posts: Post[];
  master: Omit<UserProfile, 'uid'>;
  members: UserProfile[];
  challengeInfo: Pick<ChallengePostFields, 'duration' | 'content' | 'memberCapacity' | 'skill' | 'title'>;
}

export interface QueryableWorkspaceWithChallenge {
  workspaceList: WorkspaceWithChallenge[];
  totalCount: number;
  currentPage: number;
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
  content: string;
  originId: string;
  title: string;
  authorId: string;
  author: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface QueryablePost extends Post {
  postId: string;
}
