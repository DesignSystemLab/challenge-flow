import { useState } from 'react';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { Loading } from '@shared/components/Icons';
import { TextInput, Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useCreatePost } from '../hooks/useCreatePost';
import type { PeriodFormat, ContextProps } from '../types';

interface Props extends ContextProps {
  period: PeriodFormat;
}

export const WritePost = (props: Props) => {
  const { userSession, workspaceId, period } = props;
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState<string>('');
  const router = useRouter();
  const prevPaage = `/workspace/${router.query.workspaceId}`;
  const { mutate, isLoading } = useCreatePost(() => {
    router.replace(prevPaage);
  });

  return (
    <form
      onSubmit={handleSubmit((postInfo) => {
        if (userSession && typeof workspaceId === 'string') {
          mutate({
            author: userSession.user.uid,
            title: postInfo.post,
            content,
            workspaceId,
            turn: period
          });
        }
      })}
    >
      <TextInput
        clearable
        placeholder="제목을 입력하세요"
        {...register('post', {
          required: '제목을 입력해주세요.'
        })}
      >
        <TextInput.Label>제목</TextInput.Label>
      </TextInput>
      <MarkdownEditor onChange={setContent} />
      <Button
        type="button"
        color="red-lighten2"
        onClick={() => {
          router.replace(prevPaage);
        }}
      >
        취소
      </Button>
      <Button type="submit" disabled={isLoading} icon={isLoading ? <Loading /> : undefined}>
        작성하기
      </Button>
    </form>
  );
};
