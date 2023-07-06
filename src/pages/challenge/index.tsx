import { UserSession } from '@challenge/types';
import { ChallengeList } from '@challenge/components/ChallengeList';
import { ChallengeFilter } from '@challenge/components/ChallengeFilter';
import { ChallengeListError } from '@challenge/components/Error';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Loading = () => <div>페이지 로딩중이얍</div>;

const ChallengePage = () => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;

  const router = useRouter();

  const moveToNewChallenge = () => {
    router.push({
      pathname: '/challenge/new'
    });
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Button as="a" onClick={moveToNewChallenge} size="lg" variant="ghost" color="primary-500">
        챌린저 모집
      </Button>
      <ChallengeFilter />
      <CompositionBoundaryReactQuery suspense={<Loading />} error={(prop) => <ChallengeListError {...prop} />}>
        <ChallengeList showTotalCount currentUser={userSession?.user} />
      </CompositionBoundaryReactQuery>
    </div>
  );
};

export default ChallengePage;
