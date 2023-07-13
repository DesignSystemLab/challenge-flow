import { useEffect, useState } from 'react';
import { getCommentCount } from '@shared/utils/firestore';

export const useGetCommentCount = (postId: string) => {
  const [commentCount, setCommentCount] = useState<number>(0);
  useEffect(() => {
    async function fetchCommentCount() {
      const data = await getCommentCount(postId, 'challenge');
      setCommentCount(data);
    }
    fetchCommentCount();
  }, [postId]);
  return commentCount;
};
