import { getTimeDiff } from '@shared/utils/date';
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
    <div>
      <form onSubmit={handleSubmit((formValues) => onUpdateComment(formValues, data.id))}>
        {editMode === data.id ? (
          <Textarea {...register('comment')} defaultValue={data.content} />
        ) : (
          <>
            <Text variant="paragraph" size="md">
              {data.content}
            </Text>
          </>
        )}

        <div css={{ display: 'flex', gap: '8px' }}>
          <Text variant="label" size="sm">
            {getTimeDiff(data.createdAt)}
          </Text>
          {data.updatedAt && (
            <Text variant="label" size="sm">
              {getTimeDiff(data.updatedAt)}(수정됨)
            </Text>
          )}
          <Text variant="label" size="sm">
            {`${data.userId}`}
          </Text>
        </div>
        {editMode === data.id ? (
          <>
            <Button size="sm" variant="ghost" onClick={cancelEditMode}>
              취소
            </Button>
            <Button type="submit" size="sm">
              저장
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="ghost" onClick={toggleEditMode}>
              수정
            </Button>
            <Button size="sm" variant="ghost" color="error">
              삭제
            </Button>
          </>
        )}
      </form>
      <hr />
    </div>
  );
};
