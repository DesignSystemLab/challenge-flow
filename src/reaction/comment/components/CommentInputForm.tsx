import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { commentTextareaWrapperStyle } from '@reaction/styles/commentStyle';
import { useHandleKeyDown } from '@reaction/hooks/useHandleKeyDown';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { Button, Textarea } from '@jdesignlab/react';
import { useForm } from 'react-hook-form';
import { useCreateMutation } from '../hooks/useCreateMutation';

interface Props {
  originId: string;
  currentUser: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  };
}
export const CommentInputForm = ({ originId, currentUser }: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const successAction = () => {
    reset();
  };
  const { onSubmit } = useCreateMutation(currentUser.uid, originId, successAction);

  const { enterKeyDown } = useHandleKeyDown();
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    enterKeyDown(event, handleSubmit(onSubmit));
  };
  const { userInfo } = useGetUserInfoById(currentUser.uid);

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={commentTextareaWrapperStyle}>
      <Avatar src={userInfo?.photo} size="lg" />
      <Textarea {...register('comment')} onKeyDown={onKeyDown} resize="smart" />
      <Button type="submit" variant="outline" color="grey-darken1">
        등록
      </Button>
    </form>
  );
};
