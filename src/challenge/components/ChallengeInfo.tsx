import { memo } from 'react';
import { ChallengeModifyFetchProps, UserData } from '@challenge/types';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { calculateDateDiff, formatDate, getDate, isEarlierThanNow } from '@shared/utils/date';
import { useDeleteMutation } from '@challenge/hooks/useDeleteMutation';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { TimeAgo } from '@shared/components/dataDisplay/TimeAgo';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { SKILLS } from '@shared/constants';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import {
  challengeInfoHeadingButtonWrapperStyle,
  challengeInfoOptionListItemStyle,
  challengeInfoOptionListWrapperStyle,
  challengeInfoTitleStyle,
  challengeInfoUserStyle,
  challengeInfoUserWrapperStyle
} from '@challenge/styles/challengeStyle';
import { Button, Text } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { CanI } from './CanI';

interface Props {
  postInfo: ChallengeModifyFetchProps;
  currentUser: UserData;
}

export const ChallengeInfo = memo(({ postInfo, currentUser }: Props) => {
  const { userInfo } = useGetUserInfoById(postInfo.userId);

  const router = useRouter();

  const successAction = () => {
    router.push({ pathname: `/challenge` });
  };

  const modifyPost = () => {
    router.push({
      pathname: `${postInfo.id}/modify`
    });
  };
  const { deleteAction } = useDeleteMutation(currentUser?.uid, successAction);
  const deletePost = () => {
    deleteAction(postInfo.id);
  };

  return (
    <>
      <div style={{ marginTop: '12px' }}>
        <div css={challengeInfoTitleStyle}>{postInfo.title}</div>
        <div css={challengeInfoHeadingButtonWrapperStyle}>
          <CanI.Update allowedUserId={postInfo.userId} currentUser={currentUser}>
            <Button variant="ghost" size="md" onClick={modifyPost}>
              수정
            </Button>
            <Button variant="ghost" size="md" color="error" onClick={deletePost}>
              삭제
            </Button>
          </CanI.Update>
        </div>
      </div>

      <div css={challengeInfoUserWrapperStyle}>
        <div css={challengeInfoUserStyle}>
          <Avatar size="md" />
          <Text variant="heading" size="md">
            {userInfo?.name}
          </Text>
        </div>
        <TimeAgo createdAt={postInfo.createdAt} updatedAt={postInfo?.updatedAt} />
      </div>

      <ul css={challengeInfoOptionListWrapperStyle}>
        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            모집 마감일
          </Text>
          <Text variant="paragraph" size="md">
            {postInfo.dueAt}
          </Text>

          {isEarlierThanNow(postInfo.dueAt) ? (
            <Chip size="sm" color="#f48fb1">
              D{calculateDateDiff(postInfo.dueAt, formatDate(getDate(), '-'))}
            </Chip>
          ) : (
            <Chip size="sm" color="#808080">
              마감
            </Chip>
          )}
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            기술 스택
          </Text>
          <Text variant="paragraph" size="md">
            {`${SKILLS[postInfo.skill]}`}
          </Text>
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            진행 기간
          </Text>
          <Text variant="paragraph" size="md">
            {postInfo.duration.start} ~ {postInfo.duration.end}
          </Text>
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            진행 간격
          </Text>
          <Text variant="paragraph" size="md">
            {postInfo.isDaily ? '매일' : '매주'}
          </Text>
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            공개 여부
          </Text>
          <Text variant="paragraph" size="md">
            {postInfo.isPublic ? '공개' : '비공개'}
          </Text>
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            인원
          </Text>
          <Text variant="paragraph" size="md">
            {`${postInfo.members.length}`}명 / {`${postInfo.memberCapacity}`}명
          </Text>
          {postInfo.members.length > 1 ? <Avatar.Group src={['1', '2']} /> : <Avatar size="sm" />}
          {postInfo.members.length > 2 && (
            <Text variant="paragraph" size="md" color="grey-base">
              {`+${postInfo.members.length - 2}`}
            </Text>
          )}
        </li>
      </ul>

      <MarkdownEditor viewer minHeight={320} autoHeight content={postInfo.content} />
    </>
  );
});
