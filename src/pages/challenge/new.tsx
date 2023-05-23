import { CreateChallengeForm } from '@challenge/components/CreateChallengeForm';
import { useRouter } from 'next/router';

const newChallengePost = () => {
  const router = useRouter();
  const query = router.query;
  const id = query.id as string;
  return (
    <>
      <CreateChallengeForm id={id} />
    </>
  );
};

export default newChallengePost;
