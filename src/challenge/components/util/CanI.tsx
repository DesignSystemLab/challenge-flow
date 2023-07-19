import { useContext } from 'react';
import { ChallengeContext } from '@challenge/context';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { isAfterThanNow } from '@shared/utils/date';

const Update = ({ children, allowedUserId }: { children: React.ReactNode; allowedUserId: string }) => {
  const { currentUser } = useContext(ChallengeContext);
  const isAuthor = allowedUserId === currentUser?.uid;

  if (isAuthor) return <>{children}</>;
  return null;
};

const MakeWorkspace = ({ children, postInfo }: { children: React.ReactNode; postInfo: ChallengeModifyFetchProps }) => {
  const { currentUser } = useContext(ChallengeContext);
  const isAuthor = postInfo.userId === currentUser?.uid;
  const duePassed = isAfterThanNow(postInfo.dueAt);
  const isFull = postInfo.memberCapacity <= postInfo.members.length;

  if (isAuthor && (duePassed || isFull)) return <>{children}</>;
  return null;
};

export const CanI = {
  Update,
  MakeWorkspace
};
