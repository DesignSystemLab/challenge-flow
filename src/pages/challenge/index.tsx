import { ChallengeCard } from '@challenge/components/ChallengeCard';
import { challengeCardContainer } from '@challenge/styles';
import { Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { ChallengeAPI } from '@challenge/remotes';
import { ChallengePostFields } from '@challenge/types';
import { generateNextId } from '@shared/utils';
import { CHALLENGE_ID_PREFIX } from '@challenge/constants';
import { useQuery } from 'react-query';

const ChallengePage = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery('challengeList', ChallengeAPI.getList);

  const moveToNewChallenge = () => {
    if (data) {
      router.push({
        pathname: '/challenge/new',
        query: {
          id: `${generateNextId(data, CHALLENGE_ID_PREFIX)}`
        }
      });
    }
  };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error!</div>;

  return (
    <>
      <Button variant="outline" color="primary-500" onClick={moveToNewChallenge}>
        챌린저 모집
      </Button>
      게시글 총 {data?.length}개
      <div css={challengeCardContainer}>
          {data && data.length > 0 && data.map((d: ChallengePostFields) => {
            return <ChallengeCard />;
          })}
      </div>
    </>
  );
};

export default ChallengePage;
