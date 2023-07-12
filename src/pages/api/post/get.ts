import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import { doc, getDoc } from 'firebase/firestore';
import type { QueryablePost } from '@workspace/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestParams = {
  postId: string;
};

const getPostService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { postId } = req.query as RequestParams;
    const { posts } = FIREBASE_COLLECTIONS;

    const postDocRef = doc(database, posts, postId);
    const postData = (await getDoc(postDocRef)).data() as QueryablePost;

    res.status(200).json(
      responseEntity<QueryablePost>({
        responseData: { ...postData, postId },
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

export default getPostService;
