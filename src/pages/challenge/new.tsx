import { CreateChallengeForm } from '@challenge/components/action/CreateChallengeForm';
import { HasValidSession } from '@shared/components/HasValidSession';
import { useSession } from 'next-auth/react';

interface UserSession {
  user: {
    uid: string;
    address?: string;
    name?: string;
    image?: string;
  };
  expires: string;
}

const NewChallengePage = () => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;

  return (
    <HasValidSession>
      <CreateChallengeForm currentUser={userSession?.user} />
    </HasValidSession>
  );
};

export default NewChallengePage;
