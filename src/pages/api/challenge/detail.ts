import { ChallengeModifyFetchProps } from '@challenge/types';
import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = FIREBASE_COLLECTIONS.challenge;
const challengeReadDetailService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const docRef = doc(database, REF_NAME, id as string);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = {
        ...docSnapshot.data(),
        userId: docSnapshot.data().userId.id,
        members: docSnapshot.data().members.map((member: DocumentData) => member.id),
        likes: docSnapshot.data().likes.map((like: DocumentData) => like.id),
        id: docSnapshot.id
      } as ChallengeModifyFetchProps;

      res.status(200).json(
        responseEntity<ChallengeModifyFetchProps>({
          responseData: data,
          success: true
        })
      );
    } else {
      res.status(400).json(
        responseEntity<null>({
          responseData: null,
          success: true
        })
      );
    }
  } catch (error) {
    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};

export default challengeReadDetailService;
