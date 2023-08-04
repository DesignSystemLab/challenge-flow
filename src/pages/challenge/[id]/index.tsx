import { useMemo } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { ChallengeModifyFetchProps, ChallengePostFields, UserSession } from '@challenge/types';
import { Reactions } from '@reaction/Reactions';
import { ChallengeInfo } from '@challenge/components/dataDisplay/ChallengeInfo';
import { Suggestion } from '@challenge/components/dataDisplay/Suggestion';
import { ChallengeListError } from '@challenge/components/status/Error';
import {
  challengeApplyButtonWrapperStyle,
  challengeInfoSectionStyle,
  challengeInfoWrapperStyle
} from '@challenge/styles/challengeStyle';
import { database } from '@shared/firebase';
import { Loading } from '@shared/components/Icons';
import { ChallengeContext } from '@challenge/context';
import { ApplyButton } from '@challenge/components/action/ApplyButton';
import { LikeButton } from '@challenge/components/action/LikeButton';
import { StartButton } from '@challenge/components/action/StartButton';
import { CanI } from '@challenge/components/util/CanI';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { queryClient } from '@shared/queryClient';
import { FIREBASE_COLLECTIONS } from '@shared/constants';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { dehydrate } from 'react-query';

const ChallengeDetailPage = ({ postInfo }: { postInfo: ChallengeModifyFetchProps }) => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;
  return (
    <ChallengeContext.Provider
      value={useMemo(() => ({ postInfo, currentUser: userSession?.user }), [postInfo, userSession?.user])}
    >
      <div css={challengeInfoWrapperStyle}>
        <section css={challengeInfoSectionStyle}>
          <ChallengeInfo postInfo={postInfo} />
          <div css={challengeApplyButtonWrapperStyle}>
            <LikeButton postInfo={postInfo} />
            <ApplyButton />
            <CanI.Update allowedUserId={postInfo.userId}>
              <StartButton />
            </CanI.Update>
          </div>
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
    const REF_NAME = FIREBASE_COLLECTIONS.challenge;
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
      return { props: { dehydratedProps: dehydrate(queryClient), postInfo } };
    }
  }
  return { props: {} };
};
