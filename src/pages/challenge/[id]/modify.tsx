import { useRouter } from 'next/router';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';
import { CreateChallengeForm } from '@challenge/components/CreateChallengeForm';

const ModifyPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const { useReadDetailQuery } = useChallengeApi();
  const { data, isLoading, isError } = useReadDetailQuery(id as string);

  return (
    <div>
      <CreateChallengeForm fillData={data} />
    </div>
  );
};
export default ModifyPost;
