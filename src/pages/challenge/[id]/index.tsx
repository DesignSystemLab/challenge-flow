import { useEffect, useMemo, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { ChallengeModifyFetchProps, ChallengePostFields, UserSession } from '@challenge/types';
import { Reactions } from '@reaction/Reactions';
import { useApplyMutation } from '@challenge/hooks/useApplyMutation';
import { ChallengeInfo } from '@challenge/components/ChallengeInfo';
import { Suggestion } from '@challenge/components/Suggestion';
import { ChallengeListError } from '@challenge/components/Error';
import { CanI } from '@challenge/components/CanI';
import {
  challengeApplyButtonWrapperStyle,
  challengeInfoSectionStyle,
  challengeInfoWrapperStyle
} from '@challenge/styles/challengeStyle';
import { database } from '@shared/firebase';
import { Loading } from '@shared/components/Icons';
import { isEarlierThanNow } from '@shared/utils/date';
import { ChallengeContext } from '@challenge/context';
import { useLikeMutation } from '@challenge/hooks/useLikeMutation';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { GetServerSideProps } from 'next';
import { Button } from '@jdesignlab/react';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { Checkmark, Heart, Plus } from '@jdesignlab/react-icons';

const ChallengeDetailPage = ({ postInfo }: { postInfo: ChallengeModifyFetchProps }) => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;

  const applySuccessAction = () => {};
  const { applyAction } = useApplyMutation('test1234', applySuccessAction);
  const onClickApply = () => {
    applyAction(postInfo.id);
  };

  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(postInfo.likes.length);

  useEffect(() => {
    if (userSession) {
      setLiked(postInfo.likes.includes(userSession?.user?.uid));
    }
  }, [postInfo.likes, userSession]);

  const likeErrorAction = () => {
    setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    setLiked((prev) => !prev);
  };
  const { toggleAction } = useLikeMutation(postInfo.id, userSession?.user?.uid, likeErrorAction);
  const onClickLike = () => {
    toggleAction();
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  return (
    <ChallengeContext.Provider value={useMemo(() => ({ currentUser: userSession?.user }), [userSession])}>
      <div css={challengeInfoWrapperStyle}>
        <section css={challengeInfoSectionStyle}>
          <ChallengeInfo postInfo={postInfo} />
          <div css={challengeApplyButtonWrapperStyle}>
            <Button
              onClick={onClickLike}
              size="lg"
              variant="outline"
              icon={
                <Heart
                  fill={liked ? '#f8aaae' : 'none'}
                  width={18}
                  height={18}
                  style={{ marginBottom: '2px', color: liked ? '#f8aaae' : '#4695e5' }}
                />
              }
            >
              {likeCount}
            </Button>
            <CanI.Apply postInfo={postInfo}>
              <Button
                onClick={onClickApply}
                size="lg"
                disabled={postInfo.members.includes(userSession?.user.uid)}
                icon={<Checkmark width={16} height={16} style={{ marginBottom: '2px' }} />}
              >
                {postInfo.members.includes(userSession?.user.uid) ? '참여완료' : '참여하기'}
              </Button>
            </CanI.Apply>
            <CanI.MakeWorkspace postInfo={postInfo}>
              <Button
                disabled={isEarlierThanNow(postInfo.dueAt)}
                size="lg"
                icon={<Plus width={16} height={16} style={{ marginBottom: '2px' }} />}
              >
                워크스페이스 생성
              </Button>
            </CanI.MakeWorkspace>
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
