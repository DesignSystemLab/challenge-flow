import { useContext } from 'react';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { useDeleteMutation } from '@challenge/hooks/useDeleteMutation';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { TimeAgo } from '@shared/components/dataDisplay/TimeAgo';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { SKILLS } from '@shared/constants';
import {
  challengeInfoHeadingButtonWrapperStyle,
  challengeInfoOptionListItemStyle,
  challengeInfoOptionListWrapperStyle,
  challengeInfoTitleStyle,
  challengeInfoUserStyle,
  challengeInfoUserWrapperStyle
} from '@challenge/styles/challengeStyle';
import { ChallengeContext } from '@challenge/context';
import { Button, Text } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { CanI } from './CanI';
import { AppliedMemberAvatars } from './AppliedMemberAvatars';
import { DdayChip } from './DdayChip';

interface Props {
  postInfo: ChallengeModifyFetchProps;
}

export const ChallengeInfo = ({ postInfo }: Props) => {
  const { currentUser } = useContext(ChallengeContext);
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
          <CanI.Update allowedUserId={postInfo.userId}>
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
          <Avatar src={userInfo?.photo} size="md" />
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
          <DdayChip due={postInfo.dueAt} />
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
          <AppliedMemberAvatars members={postInfo.members} currentUserId={currentUser?.uid} />
        </li>
      </ul>

      <MarkdownEditor viewer minHeight={320} autoHeight content={postInfo.content} />
    </>
  );
};
