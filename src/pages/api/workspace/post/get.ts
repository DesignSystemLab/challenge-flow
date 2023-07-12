import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { errorMessage } from '@shared/errorMessage';
import { doc, getDoc } from 'firebase/firestore';
import type { WorkspaceDocRef, PeriodFormat, Post, QueryablePost } from '@workspace/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestParams = {
  period: PeriodFormat;
  workspaceId: string;
};

const workspacePostsService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { period, workspaceId } = req.query as RequestParams;
    const { workspace } = FIREBASE_COLLECTIONS;
    const workspaceDocRef = doc(database, workspace, workspaceId);
    const workspaceTurn = (await getDoc(workspaceDocRef)).data() as WorkspaceDocRef;

    const posts = workspaceTurn[period].length
      ? await Promise.all(
          workspaceTurn[period].map(async (ref) => {
            const postData = (await getDoc(ref.post)).data() as QueryablePost;
            postData.postId = ref.post.id; // post 항목의 ID를 추가합니다.
            return postData;
          })
        )
      : [];

    res.status(200).json(
      responseEntity<Post[]>({
        responseData: posts,
        success: true
      })
    );
  } catch (error) {
    res.status(500).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: errorMessage(error || ApplicationError.SERVER)
      })
    );
  }
};

export default workspacePostsService;
