import React, { memo, useEffect } from 'react';
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
  useEffect(() => {
    console.log('info 렌더링');
  });
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
<<<<<<< HEAD
<<<<<<< Updated upstream
      <div
        css={{
          width: '80px',
          border: 'solid 1px #e1e1e1',
          // borderRadius: '6px',
          padding: '6px 0 4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start'
        }}
      >
        D{calculateDateDiff(postInfo.dueAt, formatDate(getDate(), '-'))}
      </div>
=======
      <div css={challengeInfoDdayStyle}>D{calculateDateDiff(postInfo.dueAt, formatDate(getDate(), '-'))}</div>
>>>>>>> main
      <div>
        <div css={challengeInfoTitleStyle}>{postInfo.title}</div>
        <div css={challengeInfoHeadingButtonWrapperStyle}>
          <Button variant="outline" size="sm" onClick={modifyPost}>
            수정
          </Button>
          <Button variant="outline" size="sm" color="error" onClick={deletePost}>
            삭제
          </Button>
=======
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
>>>>>>> Stashed changes
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
        {/* <Text variant="paragraph" size="md">
          {getTimeDiff(postInfo.createdAt)} 작성{' '}
          {postInfo?.updatedAt && <>({getTimeDiff(postInfo.updatedAt)} 수정됨)</>}
        </Text> */}
      </div>

<<<<<<< Updated upstream
      {/* <table css={{ width: '100%', margin: '12px 0', padding: '16px 20px', background: '#fafafa' }}>
        <tr>
          <td>
            <Text variant="heading" size="md" color="grey-darken1" align="center">
              모집 마감일
            </Text>
          </td>
          <td css={{ display: 'flex', gap: '4px' }}>
            <Text variant="paragraph" size="md">
              {postInfo.dueAt}
            </Text>
            <Chip size="sm" bordered>
              D{calculateDateDiff(postInfo.dueAt, formatDate(getDate(), '-'))}
            </Chip>
          </td>
        </tr>

        <tr>
          <td>
            <Text variant="heading" size="md" color="grey-darken1">
              진행 기간
            </Text>
          </td>
          <td css={{ display: 'flex', gap: '4px' }}>
            <Text variant="paragraph" size="md">
              {postInfo.duration.start} ~ {postInfo.duration.end}
            </Text>
            <Chip size="sm" bordered>
              {postInfo.isDaily ? '일별' : '주별'}
            </Chip>
          </td>
        </tr>
        <tr>
          <td>
            <Text variant="heading" size="md" color="grey-darken1">
              공부 주제
            </Text>
          </td>
          <td>
            <Chip size="sm" bordered>{`${SKILLS[postInfo.skill]}`}</Chip>
          </td>
        </tr>
        <tr>
          <td>
            <Text variant="heading" size="md" color="grey-darken1">
              공개 여부
            </Text>
          </td>
          <td>
            {postInfo.isPublic ? '공개' : '비공개'}
          </td>
        </tr>
        <tr>
          <td>
            <Text variant="heading" size="md" color="grey-darken1">
              인원
            </Text>
          </td>
          <td>
            {postInfo.memberCapacity}명
          </td>
        </tr>
      </table> */}

<<<<<<< HEAD
      <ul
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '12px',
          padding: '16px 20px',
          background: '#fafafa'
        }}
      >
        <li css={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
=======
      <ul css={challengeInfoOptionListWrapperStyle}>
        <li css={challengeInfoOptionListItemStyle}>
>>>>>>> Stashed changes
=======
      <ul css={challengeInfoOptionListWrapperStyle}>
        <li css={challengeInfoOptionListItemStyle}>
>>>>>>> main
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
