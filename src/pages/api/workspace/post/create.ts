import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { ApplicationError } from '@shared/constants/appplicationError';
import { errorMessage } from '@shared/errorMessage';
import { getDate, formatDateTime } from '@shared/utils/date';
import { FIREBASE_COLLECTIONS } from '@shared/constants/firebaseCollections';
import { Timestamp, doc, addDoc, updateDoc, collection, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import type { PostForm, WorkspaceDocRef, PostCommentRef } from '@workspace/types';

const workspacePostService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { posts, workspace } = FIREBASE_COLLECTIONS;
    const { workspaceId, turn, ...post } = req.body as PostForm;
    const workspaceDocRef = doc(database, workspace, workspaceId);
    const createdAt = formatDateTime(Timestamp.fromDate(getDate()).toDate());
    const insertedPost = await addDoc(collection(database, posts), { ...post, createdAt, isDeleted: false });

    if (insertedPost) {
      const workspaceData = (await getDoc(workspaceDocRef)).data() as WorkspaceDocRef;
      const targetTurn: PostCommentRef[] = workspaceData[turn] ?? [];

      await updateDoc(workspaceDocRef, {
        [turn]: [
          ...targetTurn,
          {
            post: insertedPost,
            comments: []
          }
        ]
      });

      res.status(200).json(
        responseEntity<null>({
          responseData: null,
          success: true
        })
      );
      return;
    }
    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.FIREBASE
      })
    );
  } catch (error) {
    res.status(404).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: errorMessage(error ?? ApplicationError.SERVER)
      })
    );
  }
};

export default workspacePostService;
