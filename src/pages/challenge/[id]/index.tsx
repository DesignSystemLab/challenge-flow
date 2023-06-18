import { ParsedUrlQuery } from 'querystring';
import { ChallengeAPI } from '@challenge/remotes';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';
import { ChallengePostFields } from '@challenge/types';
import { Reactions } from 'src/reaction/components/Reactions';
import { ChallengeInfo } from '@challenge/components/ChallengeInfo';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { useRouter } from 'next/router';
import { Button, Flex } from '@jdesignlab/react';
import { GetServerSideProps } from 'next';

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
  const router = useRouter();
  const { useApplyMutation, useDeleteMutation } = useChallengeApi();
  const applyMutation = useApplyMutation();
  const deleteMutation = useDeleteMutation();

  const modifyPost = () => {
    router.push({
      pathname: `${postInfo.id}/modify`
    });
  };

  const deletePost = () => {
    deleteMutation.mutate({ postId: postInfo.id });
  };

  const onClickApply = () => {
    applyMutation.mutate({ postId: postInfo.id, userId: 'userId1234' });
  };

  return (
    <div>
      <div>
        <ChallengeInfo postInfo={postInfo} />
        {postInfo.dueAt}
        <MarkdownEditor viewer height={310} content={postInfo.content} />
        <Flex>
          <Flex.Item>
            {/* {postInfo.memberCapacity > postInfo.members?.length && ( */}
            <Button variant="outline" disabled={!!applyMutation.isLoading} onClick={onClickApply}>
              {applyMutation.isLoading ? '신청 중' : '참여신청'}
            </Button>
            {/* )} */}
          </Flex.Item>
          <Flex.Item>
            <Button variant="outline" onClick={modifyPost}>
              수정
            </Button>
          </Flex.Item>
          <Flex.Item>
            <Button variant="outline" onClick={deletePost} disabled={!!deleteMutation.isLoading}>
              {deleteMutation.isLoading ? '삭제 중' : '삭제'}
            </Button>
          </Flex.Item>
        </Flex>
      </div>
      <Reactions originId={postInfo.id} />
    </div>
  );
};
export default ChallengeDetail;
