import { useContext, useEffect, useState } from 'react';
import { useLikeMutation } from '@challenge/hooks/useLikeMutation';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { ChallengeContext } from '@challenge/context';
import { Button } from '@jdesignlab/react';
import { Heart } from '@jdesignlab/react-icons';

interface Props {
  postInfo: ChallengeModifyFetchProps;
}

export const LikeButton = ({ postInfo }: Props) => {
  const { currentUser } = useContext(ChallengeContext);
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
  );
};
