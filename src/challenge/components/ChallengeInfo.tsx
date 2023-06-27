import { ChallengePostFields } from '@challenge/types';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { calculateDateDiff, formatDate, getDate, getTimeDiff } from '@shared/utils/date';
import { useDeleteMutation } from '@challenge/hooks/useDeleteMutation';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { SKILLS } from '@shared/constants';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import {
  challengeInfoDdayStyle,
  challengeInfoHeadingButtonWrapperStyle,
  challengeInfoOptionListItemStyle,
  challengeInfoOptionListWrapperStyle,
  challengeInfoTitleStyle,
  challengeInfoUserStyle,
  challengeInfoUserWrapperStyle
} from '@challenge/styles/challengeStyle';
import { Button, Text } from '@jdesignlab/react';
import { useRouter } from 'next/router';

export const ChallengeInfo = ({ postInfo }: { postInfo: ChallengePostFields }) => {
  const router = useRouter();

  const successAction = () => {
    router.push({ pathname: `/challenge` });
  };

  const { deleteAction } = useDeleteMutation('test1234', successAction);

  const modifyPost = () => {
    router.push({
      pathname: `${postInfo.id}/modify`
    });
  };

  const deletePost = () => {
    deleteAction(postInfo.id);
  };

  return (
    <>
      <div css={challengeInfoDdayStyle}>D{calculateDateDiff(postInfo.dueAt, formatDate(getDate(), '-'))}</div>
      <div>
        <div css={challengeInfoTitleStyle}>{postInfo.title}</div>
        <div css={challengeInfoHeadingButtonWrapperStyle}>
          <Button variant="outline" size="sm" onClick={modifyPost}>
            수정
          </Button>
          <Button variant="outline" size="sm" color="error" onClick={deletePost}>
            삭제
          </Button>
        </div>
      </div>

      <div css={challengeInfoUserWrapperStyle}>
        <div css={challengeInfoUserStyle}>
          <Avatar size="md" />
          <Text variant="heading" size="md">
            useId
          </Text>
        </div>
        <Text variant="paragraph" size="md">
          {getTimeDiff(postInfo.createdAt)} 작성{' '}
          {postInfo?.updatedAt && <>({getTimeDiff(postInfo.updatedAt)} 수정됨)</>}
        </Text>
      </div>

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

      <ul css={challengeInfoOptionListWrapperStyle}>
        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            모집 마감일
          </Text>
          <Text variant="paragraph" size="md">
            {postInfo.dueAt}
          </Text>
          <Chip size="sm" bordered>
            D{calculateDateDiff(postInfo.dueAt, formatDate(getDate(), '-'))}
          </Chip>
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            진행 기간
          </Text>
          <Text variant="paragraph" size="md">
            {postInfo.duration.start} ~ {postInfo.duration.end}
          </Text>
          <Chip size="sm" bordered>
            {postInfo.isDaily ? '일별' : '주별'}
          </Chip>
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            공부 주제
          </Text>
          <Chip size="sm" bordered>{`${SKILLS[postInfo.skill]}`}</Chip>
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            공개 여부
          </Text>
          <Chip size="sm" bordered>
            {postInfo.isPublic ? '공개' : '비공개'}
          </Chip>
        </li>

        <li css={challengeInfoOptionListItemStyle}>
          <Text variant="heading" size="md" color="grey-darken1">
            인원
          </Text>
          <Chip size="sm" bordered>
            {postInfo.memberCapacity}명
          </Chip>
        </li>
      </ul>

      {/* <div>{postInfo.content}</div> */}
      <MarkdownEditor viewer minHeight={320} autoHeight content={postInfo.content} />
    </>
  );
};
