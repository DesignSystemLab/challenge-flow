import { ChallengeModifyFetchProps, UserData } from '@challenge/types';
import { isAfterThanNow, isEarlierThanNow } from '@shared/utils/date';

const Apply = ({
  children,
  postInfo,
  currentUser
}: {
  children: React.ReactNode;
  postInfo: ChallengeModifyFetchProps;
  currentUser: UserData;
}) => {
  const hasValidSession = currentUser;
  const isAvailableCapacity = postInfo.memberCapacity > postInfo.members.length;
  const isBeforeDue = isEarlierThanNow(postInfo.dueAt);
  const notAppliedYet = postInfo.members.includes(currentUser?.uid);

  if (hasValidSession && notAppliedYet && isAvailableCapacity && isBeforeDue) return <>{children}</>;
  return null;
};

const Update = ({
  children,
  allowedUserId,
  currentUser
}: {
  children: React.ReactNode;
  allowedUserId: string;
  currentUser: UserData;
}) => {
  const isAuthor = allowedUserId === currentUser?.uid;

  if (isAuthor) return <>{children}</>;
  return null;
};

const MakeWorkspace = ({
  children,
  postInfo,
  currentUser
}: {
  children: React.ReactNode;
  postInfo: ChallengeModifyFetchProps;
  currentUser: UserData;
}) => {
  const isAuthor = postInfo.userId === currentUser?.uid;
  const duePassed = isAfterThanNow(postInfo.dueAt);
  const isFull = postInfo.memberCapacity <= postInfo.members.length;

  if (isAuthor && (duePassed || isFull)) return <>{children}</>;
  return null;
};

export const CanI = () => <></>;

CanI.Apply = Apply;
CanI.Update = Update;
CanI.MakeWorkspace = MakeWorkspace;
