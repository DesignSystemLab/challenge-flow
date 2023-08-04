import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { formatDateTime, getDate } from '@shared/utils/date';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = FIREBASE_COLLECTIONS.challenge;

const challengeModifyService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const param = req.body;
    // TODO id 검사
    const { id, userId, ...updateValue } = param;

    const ref = doc(database, REF_NAME, param.id);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      await updateDoc(ref, {
        ...updateValue,
        updatedAt: formatDateTime(getDate())
      });

      res.status(200).json(
        responseEntity<string>({
          responseData: ref.id,
          success: true
        })
      );
    } else {
      // TODO
      res.status(400).json(
        responseEntity<string>({
          responseData: '',
          success: false,
          message: ApplicationError.BADREQUEST
        })
      );
    }
  } catch (error) {
    res.status(400).json(
      responseEntity<string>({
        responseData: '',
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};

export default challengeModifyService;
