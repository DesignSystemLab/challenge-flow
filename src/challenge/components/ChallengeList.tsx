import { ChallengeCard } from '@challenge/components/ChallengeCard';
import { challengeCardContainer } from '@challenge/styles';
import { ChallengePostFields } from '@challenge/types';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';

export const ChallengeList = () => {
  const { useReadListQuery } = useChallengeApi();
  const { data } = useReadListQuery();
  // const { data, isLoading, isError } = useCommonQuery('challengeList', getPostList);

  return (
    <>
      게시글 총 {data?.length}개
      <div css={challengeCardContainer}>
        {data &&
          data.length > 0 &&
          data.map((post: ChallengePostFields) => (
            <div key={post.id}>
              <ChallengeCard postInfo={post} />
            </div>
          ))}
      </div>
    </>
  );
};
