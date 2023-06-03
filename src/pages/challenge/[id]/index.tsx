import { ChallengeAPI } from '@challenge/remotes';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';
import { ChallengePostFields } from '@challenge/types';
import { useRouter } from 'next/router';
import { Button, Text } from '@jdesignlab/react';

export async function getServerSideProps(props: any) {
  const { id } = props.params;
  const postInfo = await ChallengeAPI.getPostDetail(id);
  return { props: { postInfo } };
}
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
      {postInfo.id}
      <Text variant="heading" size="xl">
        {postInfo.title}
      </Text>
      <Text variant="paragraph" size="md">
        {postInfo.content}
      </Text>
      <hr />
      <Button variant="outline" disabled={!!applyMutation.isLoading} onClick={onClickApply}>
        {applyMutation.isLoading ? '신청 중' : '참여신청'}
      </Button>
      <Button variant="outline" onClick={modifyPost}>
        수정
      </Button>
      <Button variant="outline" onClick={deletePost} disabled={!!deleteMutation.isLoading}>
        {deleteMutation.isLoading ? '삭제 중' : '삭제'}
      </Button>
    </div>
  );
};
export default ChallengeDetail;
