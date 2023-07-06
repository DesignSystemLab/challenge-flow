import { useContext, useState } from 'react';
import { ReactionContext } from '@reaction/context';
import { CommentFields } from '@reaction/types';
import { EachComment } from './EachComment';
import { CommentInputForm } from './CommentInputForm';
import { useReadListQuery } from '../hooks/useReadQuery';

export const Comments = ({
  currentUser
}: {
  currentUser: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  };
}) => {
  const { originId } = useContext(ReactionContext);
  const { data } = useReadListQuery(originId);
  const [editModeId, setEditModeId] = useState<string | null>(null);

  return (
    <>
      <CommentInputForm originId={originId} currentUser={currentUser} />
      {data?.map((comment: CommentFields) => (
        <div key={comment.id}>
          <EachComment data={comment} currentUser={currentUser} editModeId={editModeId} setEditModeId={setEditModeId} />
        </div>
      ))}
    </>
  );
};
