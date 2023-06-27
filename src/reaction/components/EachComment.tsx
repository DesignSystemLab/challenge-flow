import { getTimeDiff } from '@shared/utils/date';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { Button, Text, Textarea } from '@jdesignlab/react';
import { useForm } from 'react-hook-form';
import { EachCommentProps } from '../types';

export const EachComment = ({ data, onUpdateComment, editMode, setEditMode }: EachCommentProps) => {
  const { register, handleSubmit } = useForm();
  const toggleEditMode = () => {
    setEditMode(data.id);
  };
  const cancelEditMode = () => {
    setEditMode(null);
  };

  return (
    <>
      <div css={{ position: 'relative', padding: '12px 16px', border: 'solid grey 1px', borderRadius: '4px' }}>
        <div css={{ display: 'flex', gap: '8px' }}>
          <Avatar size="md" />
          <div>
            <Text variant="label" size="md">
              {`${data.userId}`}
            </Text>
            {/* <Text variant="label" size="sm">
              {getTimeDiff(data.createdAt)}
              {data.updatedAt && (
                <Text variant="label" size="sm">
                  &{getTimeDiff(data.updatedAt)}(수정됨)
                </Text>
              )}
            </Text> */}

            {data.updatedAt ? (
              <Text variant="label" size="sm">
                {getTimeDiff(data.updatedAt)}(수정됨)
              </Text>
            ) : (
              <Text variant="label" size="sm">
                {getTimeDiff(data.createdAt)}
              </Text>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit((formValues) => onUpdateComment(formValues, data.id))} css={{ marginTop: '8px' }}>
          {editMode === data.id ? (
            <>
              <Textarea {...register('comment')} defaultValue={data.content} />
              <Button size="sm" variant="ghost" onClick={cancelEditMode}>
                취소
              </Button>
              <Button type="submit" size="sm">
                저장
              </Button>
            </>
          ) : (
            <>
              <Text variant="paragraph" size="md">
                {data.content}
              </Text>
            </>
          )}
        </form>

        {!editMode && (
          <div css={{ position: 'absolute', top: '16px', right: '16px' }}>
            <Button size="sm" variant="ghost" onClick={toggleEditMode}>
              수정
            </Button>
            <Button size="sm" variant="ghost" color="error">
              삭제
            </Button>
          </div>
        )}
      </div>
      {/* <hr /> */}
    </>
  );
};
