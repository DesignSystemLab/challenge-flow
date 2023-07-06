import { useState } from 'react';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { Loading } from '@shared/components/Icons';
import { TextInput, Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useUpdatePost } from '../hooks/useUpdatePost';

interface Props {
  title: string;
  content: string;
  postId: string;
}

export const EditPost = (props: Props) => {
  const { content: preContent, title = '', postId } = props;
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState<string>(preContent ?? '');
  const router = useRouter();
  const prevPaage = `/workspace/${router.query.workspaceId}`;
  const { mutate: updatePost, isLoading } = useUpdatePost(() => {
    router.replace(prevPaage);
  });

  return (
    <form
      onSubmit={handleSubmit((postInfo) => {
        updatePost({ content, postId, title: postInfo.title });
      })}
    >
      <TextInput
        defaultValue={title}
        clearable
        placeholder="제목을 입력하세요"
        {...register('title', {
          required: '제목을 입력해주세요.'
        })}
      >
        <TextInput.Label>제목</TextInput.Label>
      </TextInput>
      <MarkdownEditor content={preContent} onChange={setContent} />
      <Button
        type="button"
        color="red-lighten2"
        onClick={() => {
          router.back();
        }}
      >
        취소
      </Button>
      <Button type="submit" disabled={isLoading} icon={isLoading ? <Loading /> : undefined}>
        수정하기
      </Button>
    </form>
  );
};
