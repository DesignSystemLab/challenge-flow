import React, { useContext, useState } from 'react';
import { reactionWrapperStyle } from '@reaction/styles/commentStyle';
import { useQuery } from 'react-query';
import { EachComment } from './EachComment';
import { CommentTextarea } from './CommentTextarea';
import fetchReadCommentList from '../remotes/fetchReadCommentList';
import { useUpdateComment } from '../hooks/useUpdateComment';
import { CommentFields } from '../types';
import { ReactionContext } from '../context';

export const CommentReactions = ({ userId }: { userId: string | undefined | null }) => {
  console.log(userId);
  const { originId } = useContext(ReactionContext);

  const [editMode, setEditMode] = useState<string | null>(null);
  const { data } = useQuery(`comment-${originId}`, () => fetchReadCommentList({ originId }));

  const { onUpdateComment } = useUpdateComment(originId, setEditMode);

  return (
    <>
      <CommentTextarea originId={originId} />
      <div css={reactionWrapperStyle}>
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
      </div>
    </>
  );
};
