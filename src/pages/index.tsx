import { Banner } from '@banner/components/Banner';
import { ChallengeList } from '@challenge/components/ChallengeList';
import { ChallengeListError } from '@challenge/components/Error';
import { ChallengeFilter } from '@challenge/components/ChallengeFilter';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Loading } from '@shared/components/Icons';
import { UserSession } from '@challenge/types';
import { useRouter } from 'next/router';
import { Button } from '@jdesignlab/react';
import { EllipsisHorizontal } from '@jdesignlab/react-icons';
import { useSession } from 'next-auth/react';

const MainPage = () => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;

  const router = useRouter();

  const moveToChallengeList = () => {
    router.push({ pathname: '/challenge' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Banner />
      <CompositionBoundaryReactQuery suspense={<Loading />} error={(prop) => <ChallengeListError {...prop} />}>
        <div style={{ position: 'relative' }}>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap-reverse' }}
          >
            <ChallengeFilter />
            <Button as="a" onClick={moveToChallengeList} variant="ghost" icon={<EllipsisHorizontal />}>
              더 보러 가기
            </Button>
          </div>
          <ChallengeList currentUser={userSession?.user} showTotalCount />
        </div>
      </CompositionBoundaryReactQuery>
    </div>
  );
};

export default MainPage;
