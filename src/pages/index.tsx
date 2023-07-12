import { Banner } from '@banner/components/Banner';
import { ChallengeList } from '@challenge/components/ChallengeList';
import { ChallengeListError } from '@challenge/components/Error';
import { ChallengeFilter } from '@challenge/components/ChallengeFilter';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Loading } from '@shared/components/Icons';
// import { UserSession } from '@challenge/types';
import { useRouter } from 'next/router';
import { Button } from '@jdesignlab/react';
import { Plus } from '@jdesignlab/react-icons';

const MainPage = () => {
  const router = useRouter();

  const moveToChallengeList = () => {
    router.push({ pathname: '/challenge' });
  };

  const moveToNewChallenge = () => {
    router.push({
      pathname: '/challenge/new'
    });
  };

  return (
    <Layout.Column gap={20}>
      <Banner />
      <CompositionBoundaryReactQuery suspense={<Loading />} error={(prop) => <ChallengeListError {...prop} />}>
        <div style={{ position: 'relative' }}>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap-reverse' }}
          >
            <ChallengeFilter />
            <Layout.Row gap={4}>
              <Button as="a" onClick={moveToChallengeList} variant="outline">
                더 보러 가기
              </Button>
              <Button onClick={moveToNewChallenge} icon={<Plus width={16} />}>
                챌린저 모집
              </Button>
            </Layout.Row>
          </div>
          <ChallengeList />
        </div>
      </CompositionBoundaryReactQuery>
    </Layout.Column>
  );
};

export default MainPage;
