import { useContext } from 'react';
import { EachCommentProps } from '@reaction/types';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { CanI } from '@challenge/components/CanI';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { TimeAgo } from '@shared/components/dataDisplay/TimeAgo';
import { ReactionContext } from '@reaction/context';
import {
  commentEachWrapperStyle,
  commentFormEditStyle,
  commentProfileWrapperStyle
} from '@reaction/styles/commentStyle';
import { Button, Text, Textarea } from '@jdesignlab/react';
import { useForm } from 'react-hook-form';
import { useModifyMutation } from '../hooks/useModifyMutation';
import { useDeleteMutation } from '../hooks/useDeleteMutation';

export const EachComment = ({ data, currentUser, editModeId, setEditModeId }: EachCommentProps) => {
  const { originId } = useContext(ReactionContext);
  const { register, handleSubmit } = useForm();

  // TODO path
  const { userInfo } = useGetUserInfoById(data.userId);

  const toggleEditMode = () => {
    setEditModeId(data.id);
  };
  const cancelEditMode = () => {
    setEditModeId(null);
  };

  const modifySuccessAction = () => {
    cancelEditMode();
  };
  const { modifyAction } = useModifyMutation(currentUser.uid, originId, modifySuccessAction);

  const deleteSuccessAction = () => {};
  const { deleteAction } = useDeleteMutation(currentUser.uid, originId, deleteSuccessAction);
  const deleteComment = () => {
    deleteAction(data.id);
  };

  return (
    <div css={commentEachWrapperStyle}>
      <div css={commentProfileWrapperStyle}>
        <Avatar size="md" />
        <div>
          <Text variant="label" size="md">
            {userInfo?.name}
          </Text>

          <TimeAgo createdAt={data.createdAt} updatedAt={data.updatedAt} size="sm" wrap />
        </div>

        <div css={{ flex: '2' }}>
          {editModeId === data.id ? (
            <form onSubmit={handleSubmit((formValues) => modifyAction(formValues, data.id))} css={commentFormEditStyle}>
              <Textarea {...register('comment')} defaultValue={data.content} resize="smart" />
              <Button size="sm" variant="ghost" onClick={cancelEditMode}>
                취소
              </Button>
              <Button type="submit" size="sm">
                저장
              </Button>
            </form>
          ) : (
            <>
              <Text variant="paragraph" size="md">
                {data.content}
              </Text>
            </>
          )}
        </div>

        <CanI.Update allowedUserId={data.userId} currentUser={currentUser}>
          <div css={{ marginLeft: 'auto' }}>
            {!editModeId && (
              <div css={commentProfileWrapperStyle}>
                <Button size="sm" variant="ghost" onClick={toggleEditMode}>
                  수정
                </Button>
                <Button size="sm" variant="ghost" color="error" onClick={deleteComment}>
                  삭제
                </Button>
              </div>
            )}
          </div>
        </CanI.Update>
      </div>

      {/* {editModeId === data.id ? (
        <form
          onSubmit={handleSubmit((formValues) => modifyAction(formValues, data.id))}
          css={{ marginTop: '8px', marginLeft: 'auto' }}
        >
          <Textarea {...register('comment')} defaultValue={data.content} />
          <Button size="sm" variant="ghost" onClick={cancelEditMode}>
            취소
          </Button>
          <Button type="submit" size="sm">
            저장
          </Button>
        </form>
      ) : (
        <>
          <Text variant="paragraph" size="md">
            {data.content}
          </Text>
        </>
      )} */}

      {/* {!editModeId && (
        <div css={commentProfileWrapperStyle}>
          <Button size="sm" variant="ghost" onClick={toggleEditMode}>
            수정
          </Button>
          <Button size="sm" variant="ghost" color="error" onClick={deleteComment}>
            삭제
          </Button>
        </div>
      )} */}
    </div>
  );
};
