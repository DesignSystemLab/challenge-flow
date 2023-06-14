import React, { useState } from 'react';
import { EachComment } from './EachComment';
import { CommentTextarea } from './CommentTextarea';
import { useCommonQuery } from '../hooks/useCommentApi';
import fetchReadListComment from '../remotes/fetchReadCommentList';
import { useUpdateComment } from '../hooks/useUpdateComment';
import { CommentFields } from '../types';

export const CommentReactions = ({ originId }: { originId: string }) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const { data } = useCommonQuery(`comment-${originId}`, () => fetchReadListComment({ originId }));

  const { onUpdateComment } = useUpdateComment(originId, setEditMode);

  return (
    <>
      <CommentTextarea originId={originId} />
      {data.map((comment: CommentFields) => (
        <div key={comment.id}>
          <EachComment data={comment} onUpdateComment={onUpdateComment} editMode={editMode} setEditMode={setEditMode} />
        </div>
      ))}
    </>
  );
};
