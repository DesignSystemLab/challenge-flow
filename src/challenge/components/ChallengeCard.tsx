import { useContext } from 'react';
import { isEarlierThanNow } from '@shared/utils/date';
import {
  cardTop,
  cardWrapper,
  cardTitle,
  cardWrittenInfoWrapper,
  cardWrittenUser,
  cardOptionContainer,
  cardEachOption,
  cardBottomWrapper,
  cardReactionWrapper,
  cardEachReaction
} from '@challenge/styles/challengeCardStyle';
import { ChallengeContext } from '@challenge/context';
import { useGetCommentCount } from '@challenge/hooks/useGetCommentCount';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { TimeAgo } from '@shared/components/dataDisplay/TimeAgo';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { SKILLS } from '@shared/constants';
import { Text } from '@jdesignlab/react';
import { Eye, Heart, Message } from '@jdesignlab/react-icons';
import { AppliedMemberAvatars } from './AppliedMemberAvatars';
import { DdayChip } from './DdayChip';

interface Props {
  postInfo: ChallengeModifyFetchProps;
}

export const ChallengeCard = ({ postInfo }: Props) => {
  const { currentUser } = useContext(ChallengeContext);
  const { userInfo } = useGetUserInfoById(postInfo.userId);
  const commentCount = useGetCommentCount(postInfo.id);
  const restMemberSlot = postInfo.memberCapacity - postInfo.members.length;
  return (
    <a href={`/challenge/${postInfo.id}`} css={cardWrapper}>
      <div css={cardTop}>
        <DdayChip due={postInfo.dueAt} />
        {isEarlierThanNow(postInfo.dueAt) && restMemberSlot > 0 && (
          <Text variant="label" size="sm">
            {`${postInfo.memberCapacity - postInfo.members.length}`}명 남음🔥
          </Text>
        )}
      </div>
      {/* <Chip size="sm"  color="#f48fb1">
          인기
        </Chip> */}

      <h2 css={cardTitle}>{postInfo.title}</h2>

      <div css={cardWrittenInfoWrapper}>
        <div css={cardWrittenUser}>
          <Avatar src={userInfo?.photo} size="sm" />
          <Text variant="label" size="sm">
            {userInfo?.name}
          </Text>
        </div>
        <TimeAgo createdAt={postInfo.createdAt} updatedAt={postInfo.updatedAt} size="sm" />
        {/* <Text variant="label" size="sm">
          {getTimeDiff(postInfo.createdAt)} 작성
        </Text> */}
      </div>

      <div css={cardOptionContainer}>
        <div css={cardEachOption}>
          <Text variant="heading" size="sm">
            기술 스택
          </Text>
          <Text variant="paragraph" size="sm">
            {SKILLS[postInfo.skill]}
          </Text>
        </div>
        <div css={cardEachOption}>
          <Text variant="heading" size="sm">
            진행 기간
          </Text>
          <Text variant="paragraph" size="sm">
            {postInfo.duration.start} ~ {postInfo.duration.end}
          </Text>
        </div>
        <div css={cardEachOption}>
          <Text variant="heading" size="sm">
            진행 간격
          </Text>
          <Text variant="paragraph" size="sm">
            {postInfo.isDaily ? '일별' : '주별'}
          </Text>
        </div>
        <div css={cardEachOption}>
          <Text variant="heading" size="sm">
            공개 여부
          </Text>
          <Text variant="paragraph" size="sm">
            {postInfo.isPublic ? '공개' : '비공개'}
          </Text>
        </div>
        <div css={cardEachOption}>
          <Text variant="heading" size="sm">
            인원
          </Text>
          <Text variant="paragraph" size="sm">
            {`${postInfo.members.length}`}명 / {`${postInfo.memberCapacity}`}명
          </Text>
        </div>
      </div>

      <div css={cardBottomWrapper}>
        <AppliedMemberAvatars members={postInfo.members} currentUserId={currentUser.uid} />
        <div css={cardReactionWrapper}>
          <div css={cardEachReaction}>
            <Eye color="grey" width={20} height={20} />
            <Text variant="label" size="md" color="grey-darken1">
              0
            </Text>
          </div>
          <div css={cardEachReaction}>
            <Heart
              color="grey"
              width={20}
              height={20}
              fill={postInfo.likes?.includes(currentUser?.uid) ? '#f8aaae' : 'none'}
            />
            <Text variant="label" size="md" color="grey-darken1">
              {`${postInfo.likes?.length ?? 0}`}
            </Text>
          </div>
          <div css={cardEachReaction}>
            <Message color="grey" width={20} height={20} />
            <Text variant="label" size="md" color="grey-darken1">
              {`${commentCount}`}
            </Text>
          </div>
        </div>
      </div>
    </a>
  );
};
