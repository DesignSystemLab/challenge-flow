import { ParsedUrlQuery } from 'querystring';
import { CreateChallengeForm } from '@challenge/components/CreateChallengeForm';
import { HasValidSession } from '@shared/components/HasValidSession';
import { ChallengeAPI } from '@challenge/remotes';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

interface QueryInterface extends ParsedUrlQuery {
  id?: string;
}

interface UserSession {
  user: {
    uid: string;
    address?: string;
    name?: string;
    image?: string;
  };
  expires: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as QueryInterface;
  if (id) {
    const postInfo = await ChallengeAPI.getPostDetail(id);
    return { props: { postInfo } };
  }
  return { props: {} };
};

const ModifyPost = ({ postInfo }: { postInfo: ChallengeModifyFetchProps }) => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;
  return (
    <HasValidSession id={postInfo.userId}>
      <CreateChallengeForm currentUser={userSession?.user} fillData={postInfo} />
    </HasValidSession>
  );
};
export default ModifyPost;
