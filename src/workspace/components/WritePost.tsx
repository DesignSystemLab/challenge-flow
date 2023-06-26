import { useState } from 'react';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { useUserAuth } from '@auth/hooks/useUserAuth';
import { Loading } from '@shared/components/Icons';
import { TextInput, Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useCreatePost } from '../hooks/useCreatePost';

export const WritePost = () => {
  const { data } = useUserAuth();
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
        if (data?.email) {
          mutate({
            author: data.email,
            title: postInfo.post,
            content
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
        제출하기
      </Button>
    </form>
  );
};
