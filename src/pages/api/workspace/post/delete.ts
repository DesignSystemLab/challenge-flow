import { ApplicationError } from '@shared/constants';
import { FIREBASE_COLLECTIONS } from '@shared/constants/firebaseCollections';
import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import { database } from '@shared/firebase';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import type { PostCommentRef, PostForm, WorkspaceDocRef, Post } from '@workspace/types';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const workspacePostService: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { workspace, posts } = FIREBASE_COLLECTIONS;
    const { workspaceId, postId, turn } = req.body as Pick<PostForm, 'postId' | 'turn' | 'workspaceId'>;
    const workspaceDocRef = doc(database, workspace, workspaceId);

    if (session && workspaceDocRef) {
      const workspaceData = (await getDoc(workspaceDocRef)).data() as WorkspaceDocRef;
      const turns: PostCommentRef[] = workspaceData[turn] ?? [];
      const targetTurn = turns.find((turnRef) => turnRef.post.id === postId);

      if (targetTurn) {
        const post = (await getDoc(targetTurn.post)).data() as Post;
        if (post.authorId === session.user.uid) {
          const updateTurns = turns.filter((turnRef) => turnRef.post.id !== postId);
          await deleteDoc(doc(database, posts, postId));
          await updateDoc(workspaceDocRef, {
            [turn]: [...updateTurns]
          });

          res.status(200).json(
            responseEntity<string>({
              responseData: 'some data',
              success: true
            })
          );
        }
        return;
      }
      res.status(404).json(
        responseEntity<null>({
          responseData: null,
          success: true,
          message: 'POST가 존재하지 않습니다.'
        })
      );
    }

    res.status(401).json(
      responseEntity<null>({
        responseData: null,
        success: true,
        message: ApplicationError.UNAUTHORIZED
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

export default workspacePostService;
