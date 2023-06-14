import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { EachComment } from './EachComment';
import { CommentTextarea } from './CommentTextarea';
import fetchReadListComment from '../remotes/fetchReadCommentList';
import { useUpdateComment } from '../hooks/useUpdateComment';
import { CommentFields } from '../types';

export const CommentReactions = ({ originId }: { originId: string }) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const { data } = useQuery(`comment-${originId}`, () => fetchReadListComment({ originId }));

  const { onUpdateComment } = useUpdateComment(originId, setEditMode);

  return (
    <>
      <CommentTextarea originId={originId} />
      {data &&
        data.length > 0 &&
        data.map((comment: CommentFields) => (
          <div key={comment.id}>
            <EachComment
              data={comment}
              onUpdateComment={onUpdateComment}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </div>
        ))}
    </>
  );
};
