import { ParsedUrlQuery } from 'querystring';
import { ChallengeAPI } from '@challenge/remotes';
import { ChallengePostFields } from '@challenge/types';
import { Reactions } from 'src/reaction/components/Reactions';
import { useApplyMutation } from '@challenge/hooks/useApplyMutation';
import { ChallengeInfo } from '@challenge/components/ChallengeInfo';
import { Suggestion } from '@challenge/components/Suggestion';
import { challengeInfoSectionStyle, challengeInfoWrapperStyle } from '@challenge/styles/challengeStyle';
import { GetServerSideProps } from 'next';
import { Button } from '@jdesignlab/react';
import { useUserAuth } from '@auth/hooks/useUserAuth';

interface QueryInterface extends ParsedUrlQuery {
  id?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as QueryInterface;
  if (id) {
    const postInfo = await ChallengeAPI.getPostDetail(id);
    return { props: { postInfo } };
  }
  return { props: {} };
};
// -------------

const ChallengeDetail = ({ postInfo }: { postInfo: ChallengePostFields }) => {
  const { data: user } = useUserAuth();

  const successAction = () => {
    alert('신청되었습니다!');
  };

  const { applyAction } = useApplyMutation('test1234', successAction);

  const onClickApply = () => {
    if (!(postInfo.members as string[]).includes('test1234')) {
      applyAction(postInfo.id);
    }
  };

  return (
    <>
      <div css={challengeInfoWrapperStyle}>
        <section css={challengeInfoSectionStyle}>
          <ChallengeInfo postInfo={postInfo} />
          <div css={{ marginLeft: 'auto', display: 'flex', justifyContent: 'center' }}>
            {postInfo.memberCapacity >= postInfo.members?.length && (
              <Button variant="outline" size="md" onClick={onClickApply}>
                참여하기
              </Button>
            )}
          </div>
          <Reactions originId={postInfo.id} />
        </section>
        <Suggestion />
      </div>
    </>
  );
};
export default ChallengeDetail;
