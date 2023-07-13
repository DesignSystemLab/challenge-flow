import { ParsedUrlQuery } from 'querystring';
import { CreateChallengeForm } from '@challenge/components/CreateChallengeForm';
import { database } from '@shared/firebase';
import { HasValidSession } from '@shared/components/HasValidSession';
import { ChallengeModifyFetchProps, ChallengePostFields } from '@challenge/types';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';

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
    const REF_NAME = 'challenge';
    const docRef = doc(database, REF_NAME, id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const postInfo = {
        ...docSnapshot.data(),
        userId: docSnapshot.data().userId.id,
        members: docSnapshot.data().members.map((d: ChallengePostFields) => d.id),
        likes: docSnapshot.data().likes.map((d: ChallengePostFields) => d.id),
        id: docSnapshot.id
      };
      return { props: { postInfo } };
    }
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
