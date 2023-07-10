import { calculateDateDiff, formatDate, getDate, isEarlierThanNow } from '@shared/utils/date';
import {
  cardTop,
  cardWrapper,
  cardTitle,
  cardWrittenInfoWrapper,
  cardWrittenUser,
  cardOptionContainer,
  cardEachOption,
  cardBottomWrapper,
  cardAvatarWrapper,
  cardReactionWrapper,
  cardEachReaction
} from '@challenge/styles/challengeCardStyle';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { TimeAgo } from '@shared/components/dataDisplay/TimeAgo';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { SKILLS } from '@shared/constants';
import { Text } from '@jdesignlab/react';
import { Eye, Heart, Message } from '@jdesignlab/react-icons';

interface Props {
  postInfo: ChallengeModifyFetchProps;
  currentUser: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  };
}

export const ChallengeCard = ({ postInfo, currentUser }: Props) => {
  const { userInfo } = useGetUserInfoById(postInfo.userId);
  const restMemberSlot = postInfo.memberCapacity - postInfo.members.length;

  return (
    <a href={`/challenge/${postInfo.id}`} css={cardWrapper}>
      <div css={cardTop}>
        {isEarlierThanNow(postInfo.dueAt) || postInfo.isOpened ? (
          <Chip size="sm" color="#f48fb1">
            D{calculateDateDiff(postInfo.dueAt, formatDate(getDate(), '-'))}
          </Chip>
        ) : (
          <Chip size="sm" color="#808080">
            마감
          </Chip>
        )}
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
        <div css={cardAvatarWrapper}>
          {postInfo.members.length > 1 ? <Avatar.Group /> : <Avatar size="sm" />}
          {postInfo.members.length > 2 && (
            <Text variant="paragraph" size="md" color="grey-base">
              {`+${postInfo.members.length - 2}`}
            </Text>
          )}
          <Text variant="paragraph" size="sm" color="grey-base">
            참여중!
          </Text>
        </div>
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
              0
            </Text>
          </div>
        </div>
      </div>
    </a>
  );
};
