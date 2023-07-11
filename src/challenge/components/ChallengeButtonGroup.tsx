import { useContext, useEffect, useState } from 'react';
import { useApplyMutation } from '@challenge/hooks/useApplyMutation';
import { CanI } from '@challenge/components/CanI';
import { challengeApplyButtonWrapperStyle } from '@challenge/styles/challengeStyle';
import { isEarlierThanNow } from '@shared/utils/date';
import { useLikeMutation } from '@challenge/hooks/useLikeMutation';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { ChallengeContext } from '@challenge/context';
import { Button } from '@jdesignlab/react';
import { Checkmark, Heart, Plus } from '@jdesignlab/react-icons';

interface Props {
  postInfo: ChallengeModifyFetchProps;
}

export const ChallengeButtonGroup = ({ postInfo }: Props) => {
  const { currentUser } = useContext(ChallengeContext);

  const applySuccessAction = () => {};
  const { applyAction } = useApplyMutation('test1234', applySuccessAction);
  const onClickApply = () => {
    applyAction(postInfo.id);
  };
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(postInfo.likes.length);
  useEffect(() => {
    if (currentUser) {
      setLiked(postInfo.likes.includes(currentUser?.uid));
    }
  }, [postInfo.likes, currentUser]);

  const likeErrorAction = () => {
    setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    setLiked((prev) => !prev);
  };
  const { toggleAction } = useLikeMutation(postInfo.id, currentUser?.uid, likeErrorAction);
  const onClickLike = () => {
    toggleAction();
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  return (
    <div css={challengeApplyButtonWrapperStyle}>
      <Button
        onClick={onClickLike}
        size="lg"
        variant="outline"
        icon={
          <Heart
            fill={liked ? '#f8aaae' : 'none'}
            width={18}
            height={18}
            style={{ marginBottom: '2px', color: liked ? '#f8aaae' : '#4695e5' }}
          />
        }
      >
        {likeCount}
      </Button>
      <CanI.Apply postInfo={postInfo}>
        <Button
          onClick={onClickApply}
          size="lg"
          disabled={postInfo.members.includes(currentUser?.uid)}
          icon={<Checkmark width={16} height={16} style={{ marginBottom: '2px' }} />}
        >
          {postInfo.members.includes(currentUser?.uid) ? '참여완료' : '참여하기'}
        </Button>
      </CanI.Apply>
      <CanI.MakeWorkspace postInfo={postInfo}>
        <Button
          disabled={isEarlierThanNow(postInfo.dueAt)}
          size="lg"
          icon={<Plus width={16} height={16} style={{ marginBottom: '2px' }} />}
        >
          워크스페이스 생성
        </Button>
      </CanI.MakeWorkspace>
    </div>
  );
};
