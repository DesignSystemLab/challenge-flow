import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { ChallengeList } from '@challenge/components/ChallengeList';
import { ChallengeFilter } from '@challenge/components/ChallengeFilter';
import { ChallengeListError } from '@challenge/components/Error';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Button, Flex } from '@jdesignlab/react';
import { useRouter } from 'next/router';

const Loading = () => <div>페이지 로딩중이얍</div>;

const ChallengePage = () => {
  const router = useRouter();

  const moveToNewChallenge = () => {
    router.push({
      pathname: '/challenge/new'
    });
  };

  return (
    <Layout.Column gap={8} style={{ marginTop: '20px' }}>
      <Flex justify="space-between">
        <Flex.Item>
          <Button as="a" onClick={moveToNewChallenge} size="md" color="primary-500">
            챌린저 모집
          </Button>
        </Flex.Item>
        <Flex.Item>
          <ChallengeFilter />
        </Flex.Item>
      </Flex>
      <CompositionBoundaryReactQuery suspense={<Loading />} error={(prop) => <ChallengeListError {...prop} />}>
        <ChallengeList />
      </CompositionBoundaryReactQuery>
    </Layout.Column>
  );
};

export default ChallengePage;
