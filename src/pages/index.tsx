import { Banner } from '@banner/components/Banner';
import { ChallengeList } from '@challenge/components/dataDisplay/ChallengeGridList';
import { ChallengeListError } from '@challenge/components/status/Error';
import { mainChallengeButton } from '@challenge/styles/challengeStyle';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Loading } from '@shared/components/Icons';
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
          <div css={mainChallengeButton}>
            <Button as="a" onClick={moveToChallengeList} variant="outline">
              더 보러 가기
            </Button>
            <Button onClick={moveToNewChallenge} icon={<Plus width={16} />}>
              챌린저 모집
            </Button>
          </div>
          <ChallengeList />
        </div>
      </CompositionBoundaryReactQuery>
    </Layout.Column>
  );
};

export default MainPage;
