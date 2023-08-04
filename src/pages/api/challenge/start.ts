import { PeriodFormat, PostCommentRef } from '@workspace/types';
import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { createDateRange } from '@shared/utils/createDateRange';
import { formatDateTime, getDate } from '@shared/utils/date';
import { createOne } from '@shared/utils/firestore';
import { DocumentData, DocumentReference, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const CHALLENGE_REF = FIREBASE_COLLECTIONS.challenge;
const WORKSPACE_REF = FIREBASE_COLLECTIONS.workspace;

const challengeStartService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;
    const session = await getServerSession(req, res, authOptions);

    const docRef = doc(database, CHALLENGE_REF, id as string);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      res.status(400).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: ApplicationError.BADREQUEST
        })
      );
    } else if (docSnapshot.data().userId.id !== session?.user.uid) {
      res.status(401).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: ApplicationError.UNAUTHORIZED
        })
      );
    } else {
      const {
        isDaily,
        duration: { start, end }
      } = docSnapshot.data();
      const range = createDateRange(start, end, isDaily);

      const workspaceRef = doc(collection(database, WORKSPACE_REF));
      const value = {
        challenge: docRef,
        notice: '',
        createdAt: formatDateTime(getDate())
      } as {
        challenge: DocumentReference<DocumentData>;
        notice: string;
        createdAt: string;
        [key: PeriodFormat]: PostCommentRef[];
      };

      range.forEach((_, index: number) => {
        value[`turn${index + 1}`] = [];
      });

      await createOne(workspaceRef, value);
      await updateDoc(docRef, {
        isOpened: true
      });
      res.status(200).json(
        responseEntity<string>({
          responseData: workspaceRef.id,
          success: true
        })
      );
    }
  } catch (error) {
    res.status(400).json(
      responseEntity<boolean>({
        responseData: false,
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};

export default challengeStartService;
