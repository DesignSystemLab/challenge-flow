import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import { getDocs, query, collection, where } from 'firebase/firestore';
import type { QueryablePost } from '@workspace/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestParams = {
  workspaceId: string;
};

const getWorkspacePostsService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { workspaceId } = req.query as RequestParams;
    const { posts } = FIREBASE_COLLECTIONS;
    const postsCollection = collection(database, posts);
    const postsQuery = query(postsCollection, where('originId', '==', workspaceId));

    if (!workspaceId) {
      res.status(400).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: ApplicationError.BADREQUEST
        })
      );
    }

    const { docs } = await getDocs(postsQuery);
    const postsByWorkspace = docs.map((post) => post.data()) as QueryablePost[];

    res.status(200).json(
      responseEntity<QueryablePost[]>({
        responseData: postsByWorkspace,
        success: true
      })
    );
  } catch (error) {
    res.status(500).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: errorMessage(error ?? ApplicationError.SERVER)
      })
    );
  }
};

export default getWorkspacePostsService;
