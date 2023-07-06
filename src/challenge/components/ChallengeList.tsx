import { ChallengeCard } from '@challenge/components/ChallengeCard';
import { challengeCardContainer } from '@challenge/styles/challengeCardStyle';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { useReadListQuery } from '@challenge/hooks/useReadQuery';

interface Props {
  currentUser: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  };
  showTotalCount?: boolean;
}

export const ChallengeList = ({ currentUser, showTotalCount }: Props) => {
  const { data } = useReadListQuery();

  return (
    <>
      {showTotalCount && (
        <div style={{ position: 'absolute', top: '56px', right: 0 }}>
          게시글
          <b style={{ color: '#4695E5' }}> {`${data?.length}`}</b>개
        </div>
      )}
      <div css={challengeCardContainer}>
        {data?.map((post: ChallengeModifyFetchProps) => (
          <div key={post.id}>
            <ChallengeCard postInfo={post} currentUser={currentUser} />
          </div>
        ))}
      </div>
    </>
  );
};
