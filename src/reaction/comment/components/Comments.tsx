import { useContext, useState } from 'react';
import { ReactionContext } from '@reaction/context';
import { EachComment } from './EachComment';
import { CommentInputForm } from './CommentInputForm';
import { useReadListQuery } from '../hooks/useReadQuery';
import { CommentDataWithId } from '../types/data';

export const Comments = () => {
  const { originId, domain } = useContext(ReactionContext);
  const { data } = useReadListQuery(domain, originId);
  const [editModeId, setEditModeId] = useState<string | null>(null);

  return (
    <>
      <CommentInputForm />
      {data?.map((comment: CommentDataWithId) => (
        <div key={comment.id}>
          <EachComment data={comment} editModeId={editModeId} setEditModeId={setEditModeId} />
        </div>
      ))}
    </>
  );
};
