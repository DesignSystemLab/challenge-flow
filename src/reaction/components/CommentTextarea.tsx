import { useForm } from 'react-hook-form';
import { Button, Textarea } from '@jdesignlab/react';
import { useHandleKeyDown } from '../hooks/useHandleKeyDown';
import { useCreateComment } from '../hooks/useCreateComment';

export const CommentTextarea = ({ originId }: { originId: string }) => {
  const { register, handleSubmit, reset } = useForm();
  const { onSubmit } = useCreateComment(originId, reset);

  const { enterKeyDown } = useHandleKeyDown();
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    enterKeyDown(event, handleSubmit(onSubmit));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Textarea {...register('comment')} onKeyDown={onKeyDown} />
        <Button type="submit" variant="outline">
          등록
        </Button>
      </div>
    </form>
  );
};
