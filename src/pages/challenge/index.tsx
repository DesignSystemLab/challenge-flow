import { useRouter } from 'next/router';
import { Button } from '@jdesignlab/react';
import { ChallengeCard } from '@challenge/components/ChallengeCard';
import { challengeCardContainer } from '@challenge/styles';
import { ChallengePostFields } from '@challenge/types';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';

const ChallengePage = () => {
  const router = useRouter();
  const { useReadListQuery } = useChallengeApi();
  const { data, isLoading, isError } = useReadListQuery();

  const moveToNewChallenge = () => {
    if (data) {
      router.push({
        pathname: '/challenge/new'
      });
    }
  };

  return (
    <>
      <Button variant="outline" color="primary-500" onClick={moveToNewChallenge}>
        챌린저 모집
      </Button>
      게시글 총 {data?.length}개
      <div css={challengeCardContainer}>
        {data &&
          data.length > 0 &&
          data.map((post: ChallengePostFields) => {
            return (
              <div key={post.id}>
                <ChallengeCard postInfo={post} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChallengePage;
