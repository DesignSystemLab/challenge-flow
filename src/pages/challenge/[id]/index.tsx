import { ChallengeAPI } from '@challenge/remotes';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';
import { ChallengePostFields } from '@challenge/types';
import { Reactions } from 'src/reaction/components/Reactions';
import { ChallengeInfo } from '@challenge/components/ChallengeInfo';
import { useRouter } from 'next/router';
import { Button } from '@jdesignlab/react';

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
      <div>
        <ChallengeInfo postInfo={postInfo} />
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
      <Reactions originId={postInfo.id} />
    </div>
  );
};
export default ChallengeDetail;
