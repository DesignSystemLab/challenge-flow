import { useContext, useEffect, useState } from 'react';
import { isAfterThanNow } from '@shared/utils/date';
import { ChallengeContext } from '@challenge/context';
import { useApplyMutation } from '@challenge/hooks/useApplyMutation';
import { Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';

const APPLY_ACTION_CONTENT = '참여하기';
export const ApplyButton = () => {
  const router = useRouter();
  const { currentUser, postInfo } = useContext(ChallengeContext);

  const applySuccessAction = async () => {
    router.push({ pathname: `/challenge/${postInfo.id}` });
  };
  const { applyAction } = useApplyMutation(currentUser?.uid, applySuccessAction);
  const onClickApply = () => {
    applyAction(postInfo.id);
  };

  const [buttonContent, setButtonContent] = useState<string>('');

  useEffect(() => {
    if (postInfo.members.includes(currentUser?.uid)) {
      setButtonContent('참여 완료');
    } else if (isAfterThanNow(postInfo.dueAt)) {
      setButtonContent('모집기간 마감');
    } else if (postInfo.memberCapacity <= postInfo.members.length) {
      setButtonContent('모집인원 마감');
    } else {
      setButtonContent(APPLY_ACTION_CONTENT);
    }
  }, [currentUser, postInfo, postInfo.members]);

  return (
    <Button onClick={onClickApply} size="lg" disabled={buttonContent !== APPLY_ACTION_CONTENT}>
      {buttonContent}
    </Button>
  );
};
