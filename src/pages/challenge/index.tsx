import { Suspense } from 'react';
import DynamicWrapper from '@shared/components/DynamicWrapper';
import { ErrorModal } from '@shared/components/ErrorModal';
import { ChallengeList } from '@challenge/components/ChallengeList';
import { useUserAuth } from '@auth/hooks/useUserAuth';
import { Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';

const ChallengePage = () => {
  const { data: user } = useUserAuth();
  const router = useRouter();

  const moveToNewChallenge = () => {
    router.push({
      pathname: '/challenge/new'
    });
  };
  return (
    <>
      <Button variant="outline" color="primary-500" as="a" onClick={moveToNewChallenge}>
        챌린저 모집
      </Button>
      <DynamicWrapper>
        <ErrorBoundary FallbackComponent={ErrorModal}>
          <Suspense fallback={<div>loading</div>}>
            <ChallengeList userId={user?.uid} />
          </Suspense>
        </ErrorBoundary>
      </DynamicWrapper>
    </>
  );
};

export default ChallengePage;
