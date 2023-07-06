import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import { doc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestParams = {
  postId: string;
  content: string;
  title: string;
};

const getPostService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { postId, content, title } = req.body as RequestParams;
    const { posts } = FIREBASE_COLLECTIONS;

    const postDocRef = doc(database, posts, postId);
    await updateDoc(postDocRef, {
      title,
      content
    });

    res.status(200).json(
      responseEntity<null>({
        responseData: null,
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
