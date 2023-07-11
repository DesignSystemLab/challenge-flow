import { useMemo } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { ChallengeModifyFetchProps, ChallengePostFields, UserSession } from '@challenge/types';
import { Reactions } from '@reaction/Reactions';
import { ChallengeInfo } from '@challenge/components/ChallengeInfo';
import { Suggestion } from '@challenge/components/Suggestion';
import { ChallengeListError } from '@challenge/components/Error';
import { challengeInfoSectionStyle, challengeInfoWrapperStyle } from '@challenge/styles/challengeStyle';
import { database } from '@shared/firebase';
import { Loading } from '@shared/components/Icons';
import { ChallengeContext } from '@challenge/context';
import { ChallengeButtonGroup } from '@challenge/components/ChallengeButtonGroup';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';

const ChallengeDetailPage = ({ postInfo }: { postInfo: ChallengeModifyFetchProps }) => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;

  return (
    <ChallengeContext.Provider value={useMemo(() => ({ currentUser: userSession?.user }), [userSession])}>
      <div css={challengeInfoWrapperStyle}>
        <section css={challengeInfoSectionStyle}>
          <ChallengeInfo postInfo={postInfo} />
          <ChallengeButtonGroup postInfo={postInfo} />
          <Reactions originId={postInfo.id} domain="challenge" />
        </section>
        <CompositionBoundaryReactQuery suspense={<Loading />} error={(prop) => <ChallengeListError {...prop} />}>
          <Suggestion />
        </CompositionBoundaryReactQuery>
      </div>
    </ChallengeContext.Provider>
  );
};
export default ChallengeDetailPage;

// -------------

interface QueryInterface extends ParsedUrlQuery {
  id?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as QueryInterface;
  if (id) {
    // const postInfo = await ChallengeAPI.getPostDetail(id);
    // const postInfo = await fetchReadDetail(id);
    const REF_NAME = 'challenge';
    const docRef = doc(database, REF_NAME, id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const postInfo = {
        ...docSnapshot.data(),
        userId: docSnapshot.data().userId.id,
        likes: docSnapshot.data().likes.map((d: ChallengePostFields) => d.id),
        id: docSnapshot.id
      };
      // const postInfo = await fetchReadDetail(id);
      return { props: { postInfo } };
    }
  }
  return { props: {} };
};
