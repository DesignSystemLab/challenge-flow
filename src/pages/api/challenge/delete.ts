import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { formatDateTime, getDate } from '@shared/utils/date';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = FIREBASE_COLLECTIONS.challenge;
const DELETED_REF_NAME = 'deleted-challenge';
const challengeCreateService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const param = req.body;

    // TODO id 검사

    const targetRef = doc(database, REF_NAME, param.id);
    const destRef = doc(database, DELETED_REF_NAME, param.id);

    const docSnapshot = await getDoc(targetRef);
    if (docSnapshot.exists()) {
      await setDoc(destRef, {
        ...docSnapshot.data(),
        deleteAt: formatDateTime(getDate())
      });
      await deleteDoc(targetRef);
    }

    res.status(200).json(
      responseEntity<boolean>({
        responseData: true,
        success: true
      })
    );
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

export default challengeCreateService;
