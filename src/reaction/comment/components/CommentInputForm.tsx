import React, { useContext } from 'react';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { COMMENT_LIST } from '@reaction/constants';
import { commentTextareaWrapper } from '@reaction/comment/styles/commentStyle';
import { useHandleKeyDown } from '@reaction/comment/hooks/useHandleKeyDown';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { ReactionContext } from '@reaction/context';
import { Button, Textarea } from '@jdesignlab/react';
import { useForm } from 'react-hook-form';
import { useCreateMutation } from '../hooks/useCreateMutation';
import { resetQueryCache } from '../utils/resetQueryCache';

export const CommentInputForm = () => {
  const { currentUser } = useContext(ReactionContext);
  const { domain, originId } = useContext(ReactionContext);
  const { register, handleSubmit, reset } = useForm();
  const successAction = () => {
    reset();
    resetQueryCache(COMMENT_LIST, originId);
  };
  const { onSubmit } = useCreateMutation(originId, currentUser?.uid, domain, successAction);

  const { enterKeyDown } = useHandleKeyDown();
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    enterKeyDown(event, handleSubmit(onSubmit));
  };
  const { userInfo } = useGetUserInfoById(currentUser?.uid);

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={commentTextareaWrapper}>
      <Avatar src={userInfo?.photo} size="lg" />
      <Textarea
        {...register('comment')}
        disabled={!userInfo}
        placeholder={userInfo ? '댓글 작성하기' : '로그인을 해주세요'}
        onKeyDown={onKeyDown}
        resize="smart"
      />
      <Button disabled={!userInfo} type="submit" variant="outline" color="grey-darken1">
        등록
      </Button>
    </form>
  );
};
