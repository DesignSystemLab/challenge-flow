import { ChallengePostFields } from '@challenge/types';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { calculateDateDiff, formatDate, getDate, getTimeDiff } from '@shared/utils/date';
import { useDeleteMutation } from '@challenge/hooks/useDeleteMutation';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { SKILLS } from '@shared/constants';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
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
      <div>
        <div css={{ display: 'inline', fontSize: '28px', lineHeight: '1.4', fontWeight: '700' }}>{postInfo.title}</div>
        <div css={{ display: 'inline-flex', gap: '4px', flexWrap: 'nowrap' }}>
          <Button variant="outline" size="sm" onClick={modifyPost}>
            수정
          </Button>
          <Button variant="outline" size="sm" color="error" onClick={deletePost}>
            삭제
          </Button>
        </div>
      </div>

      <div css={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
        <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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

        <li css={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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

        <li css={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Text variant="heading" size="md" color="grey-darken1">
            공부 주제
          </Text>
          <Chip size="sm" bordered>{`${SKILLS[postInfo.skill]}`}</Chip>
        </li>

        <li css={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Text variant="heading" size="md" color="grey-darken1">
            공개 여부
          </Text>
          <Chip size="sm" bordered>
            {postInfo.isPublic ? '공개' : '비공개'}
          </Chip>
        </li>

        <li css={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
