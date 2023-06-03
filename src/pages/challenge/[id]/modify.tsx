import { useChallengeApi } from '@challenge/hooks/useChallengeApi';
import { CreateChallengeForm } from '@challenge/components/CreateChallengeForm';
import { useRouter } from 'next/router';

const ModifyPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const { useReadDetailQuery } = useChallengeApi();
  const { data } = useReadDetailQuery(id as string);

  return (
    <div>
      <CreateChallengeForm fillData={data} />
    </div>
  );
};
export default ModifyPost;
