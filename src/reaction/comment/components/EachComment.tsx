import { useContext, useState } from 'react';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { CanI } from '@challenge/components/CanI';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { TimeAgo } from '@shared/components/dataDisplay/TimeAgo';
import { COMMENT_LIST } from '@reaction/constants';
import { ReactionContext } from '@reaction/context';
import {
  eachCommentWrapper,
  editForm,
  profileWrapper,
  profileInfo,
  contentWrapper,
  editButtonWrapper,
  defaultButtonWrapper
} from '@reaction/comment/styles/commentStyle';
import { Button, Popover, Text, Textarea } from '@jdesignlab/react';
import { useForm } from 'react-hook-form';
import { useModifyMutation } from '../hooks/useModifyMutation';
import { useDeleteMutation } from '../hooks/useDeleteMutation';
import { resetQueryCache } from '../utils/resetQueryCache';
import { EachCommentProps } from '../types/componentProps';

export const EachComment = ({ data, editModeId, setEditModeId }: EachCommentProps) => {
  const { currentUser, originId } = useContext(ReactionContext);
  const { register, handleSubmit } = useForm();
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<boolean>(false);

  const { userInfo } = useGetUserInfoById(data.userId);

  const toggleEditMode = () => {
    setEditModeId(data.id);
  };
  const cancelEditMode = () => {
    setEditModeId(null);
  };

  const modifySuccessAction = () => {
    cancelEditMode();
    resetQueryCache(COMMENT_LIST, originId);
  };
  const { modifyAction } = useModifyMutation(currentUser?.uid, modifySuccessAction);

  const deleteSuccessAction = () => {
    resetQueryCache(COMMENT_LIST, originId);
  };
  const { deleteAction } = useDeleteMutation(currentUser?.uid, deleteSuccessAction);
  const deleteComment = () => {
    deleteAction(data.id);
    setDeletePopoverOpen(false);
  };

  return (
    <div css={eachCommentWrapper}>
      <div css={profileWrapper}>
        <Avatar src={userInfo?.photo} size="md" />
        <div css={profileInfo}>
          <Text variant="label" size="md" truncate>
            {userInfo?.name}
          </Text>
          <TimeAgo createdAt={data.createdAt} updatedAt={data.updatedAt} size="sm" wrap />
        </div>

        <div css={contentWrapper}>
          {editModeId === data.id ? (
            <form onSubmit={handleSubmit((formValues) => modifyAction(formValues, data.id))} css={editForm}>
              <Textarea {...register('comment')} defaultValue={data.content} resize="smart" />
              <div css={editButtonWrapper}>
                <Button size="sm" variant="ghost" onClick={cancelEditMode}>
                  취소
                </Button>
                <Button type="submit" size="sm">
                  수정
                </Button>
              </div>
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
          <div css={defaultButtonWrapper}>
            {!editModeId && (
              <Layout.Row>
                <Button size="sm" variant="ghost" onClick={toggleEditMode}>
                  수정
                </Button>
                <Popover
                  open={deletePopoverOpen}
                  onOpen={() => setDeletePopoverOpen(true)}
                  onClose={() => {
                    setDeletePopoverOpen(false);
                  }}
                  placement="top"
                >
                  <Popover.Trigger>
                    <Button size="sm" variant="ghost" color="error">
                      삭제
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Layout.Column gap={8}>
                      <Layout.Center>
                        <Text variant="label" size="md">
                          해당 댓글을 삭제하시겠습니까?
                        </Text>
                      </Layout.Center>
                      <Layout.Center>
                        <Button
                          onClick={() => setDeletePopoverOpen(false)}
                          size="md"
                          variant="outline"
                          color="grey-darken2"
                        >
                          취소
                        </Button>
                        <Button size="md" color="error" onClick={deleteComment}>
                          삭제
                        </Button>
                      </Layout.Center>
                    </Layout.Column>
                  </Popover.Content>
                </Popover>
              </Layout.Row>
            )}
          </div>
        </CanI.Update>
      </div>
    </div>
  );
};
