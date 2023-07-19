import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { ChallengeList } from '@challenge/components/dataDisplay/ChallengeGridList';
import { ChallengeSkeleton } from '@challenge/components/status/Skeleton';
import { ChallengeListError } from '@challenge/components/status/Error';
import { challengeCreateButtonWrapper } from '@challenge/styles/challengeStyle';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';

const ChallengePage = () => {
  const router = useRouter();

  const moveToNewChallenge = () => {
    router.push({
      pathname: '/challenge/new'
    });
  };

  return (
    <Layout.Column gap={8} style={{ position: 'relative' }}>
      <div css={challengeCreateButtonWrapper}>
        <Button as="a" onClick={moveToNewChallenge} size="md" color="primary-500">
          챌린저 모집
        </Button>
      </div>

      <CompositionBoundaryReactQuery
        suspense={<ChallengeSkeleton />}
        error={(prop) => <ChallengeListError {...prop} />}
      >
        <ChallengeList showTotalCount />
      </CompositionBoundaryReactQuery>
    </Layout.Column>
  );
};

export default ChallengePage;
